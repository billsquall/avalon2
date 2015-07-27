if (IEVersion) {
    avalon.bind(DOC, "selectionchange", function(e) {
        var el = DOC.activeElement
        if (el && typeof el.avalonSetter === "function") {
            el.avalonSetter()
        }
    })
}

//处理radio, checkbox, text, textarea, password
duplexBinding.INPUT = function(element, evaluator, binding) {
    var $type = element.type,
        bound = binding.bound,
        $elem = avalon(element),
        composing = false

        function callback(value) {
            binding.changed.call(this, value, binding)
        }

        function compositionStart() {
            composing = true
        }

        function compositionEnd() {
            composing = false
        }
        //当value变化时改变model的值
    var updateVModel = function() {
        if (composing) //处理中文输入法在minlengh下引发的BUG
            return
        var val = element.oldValue = element.value //防止递归调用形成死循环
        var lastValue = binding.pipe(val, binding, "get")
        if ($elem.data("duplexObserve") !== false) {
            evaluator(lastValue)
            callback.call(element, lastValue)
        }
    }
    //当model变化时,它就会改变value的值
    binding.handler = function() {
        var val = binding.pipe(evaluator(), binding, "set") + "" //fix #673
        if (val !== element.oldValue) {
            element.value = val
        }
    }
    if (binding.isChecked || $type === "radio") {
        var IE6 = IEVersion === 6
        updateVModel = function() {
            if ($elem.data("duplexObserve") !== false) {
                var lastValue = binding.pipe(element.value, binding, "get")
                evaluator(lastValue)
                callback.call(element, lastValue)
            }
        }
        binding.handler = function() {
            var val = evaluator()
            var checked = binding.isChecked ? !! val : val + "" === element.value
            element.oldValue = checked
            if (IE6) {
                setTimeout(function() {
                    //IE8 checkbox, radio是使用defaultChecked控制选中状态，
                    //并且要先设置defaultChecked后设置checked
                    //并且必须设置延迟
                    element.defaultChecked = checked
                    element.checked = checked
                }, 31)
            } else {
                element.checked = checked
            }
        }
        bound("click", updateVModel)
    } else if ($type === "checkbox") {
        updateVModel = function() {
            if ($elem.data("duplexObserve") !== false) {
                var method = element.checked ? "ensure" : "remove"
                var array = evaluator()
                if (!Array.isArray(array)) {
                    log("ms-duplex应用于checkbox上要对应一个数组")
                    array = [array]
                }
                var val = binding.pipe(element.value, binding, "get")
                avalon.Array[method](array, val)
                callback.call(element, array)
            }
        }

        binding.handler = function() {
            var array = [].concat(evaluator()) //强制转换为数组
            var val = binding.pipe(element.value, binding, "get")
            element.checked = array.indexOf(val) > -1
        }
        bound(W3C ? "change" : "click", updateVModel)
    } else {
        var events = element.getAttribute("data-duplex-event") || "input"
        if (element.attributes["data-event"]) {
            log("data-event指令已经废弃，请改用data-duplex-event")
        }

        function delay(e) { // jshint ignore:line
            setTimeout(function() {
                updateVModel(e)
            })
        }
        events.replace(rword, function(name) {
            switch (name) {
                case "input":
                    if (!IEVersion) { // W3C
                        bound("input", updateVModel)
                        //非IE浏览器才用这个
                        bound("compositionstart", compositionStart)
                        bound("compositionend", compositionEnd)
                        bound("DOMAutoComplete", updateVModel)
                    } else { //onpropertychange事件无法区分是程序触发还是用户触发
                        // IE下通过selectionchange事件监听IE9+点击input右边的X的清空行为，及粘贴，剪切，删除行为
                        if (IEVersion > 8) {
                            bound("input", updateVModel) //IE9使用propertychange无法监听中文输入改动
                        } else {
                            bound("propertychange", function(e) { //IE6-8下第一次修改时不会触发,需要使用keydown或selectionchange修正
                                if (e.propertyName === "value") {
                                    updateVModel()
                                }
                            })
                        }
                        bound("dragend", delay)
                        //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
                        //http://www.matts411.com/post/internet-explorer-9-oninput/
                    }
                    break
                default:
                    bound(name, updateVModel)
                    break
            }
        })
        bound("focus", function() {
            element.msFocus = true
        })
        bound("blur", function() {
            element.msFocus = false
        })

        if (rmsinput.test($type)) {
            watchValueInTimer(function() {
                if (root.contains(element)) {
                    if (!element.msFocus && element.oldValue !== element.value) {
                        updateVModel()
                    }
                } else if (!element.msRetain) {
                    return false
                }
            })
        }

        element.avalonSetter = updateVModel //#765
    }

    element.oldValue = element.value
    binding.handler()
    callback.call(element, element.value)
  
}
duplexBinding.TEXTAREA = duplexBinding.INPUT