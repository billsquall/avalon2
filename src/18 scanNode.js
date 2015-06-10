//避免使用firstChild，nextSibling，previousSibling等属性，一是提高速度，二是兼容VTree
function scanNodeList(parent, vmodels) {
    var nodes = avalon.slice(parent.childNodes)
    scanNodeArray(nodes, vmodels, parent)
}
//function scanNodeList(parent, vmodels) {
//    var node = parent.firstChild
//    while (node) {
//        var nextNode = node.nextSibling
//        scanNode(node, node.nodeType, vmodels)
//        node = nextNode
//    }
//}
//ms-if --> <!--v-if-->
//ms-if-loop --> <!--v-if-->
//ms-include --> <!--v-include123123--><!--v-include123123:end-->
//
//{{expr}} --> <!--v-text123213:expr--><!--v-text123213:expr:end-->
//{{expr|html}} --> <!--v-thtml123213:expr--><!--v-text123213:expr:end-->
function scanNodeArray(nodes, vmodels) {
    var bindings = []
    var firstChild = nodes[0] || {}
    var isVirtual = firstChild.isVirtual == true
    var doc = isVirtual ? VDOC : DOC //使用何种文档对象来创建各种节点
    var inDom = firstChild.nodeType === 1
    var nodeIndex = 0, parent
    for (var i = 0, node; node = nodes[i]; i++) {
        switch (node.nodeType) {
            case 1:
                nodeIndex++
                break
            case 3:
                if (rexpr.test(node.nodeValue)) {
                    var tokens = scanExpr(node.nodeValue)
                    var generateSignatures = false
                    outerLoop:
                            for (var t = 0, token; token = tokens[t++]; ) {
                        if (token.expr) {
                            generateSignatures = true
                            break outerLoop
                        }
                    }
                    if (generateSignatures) {//如果要生成占位用的注释节点
                        parent = parent || node.parentNode
                        var pid = buildTree(parent)
                        var fragment = doc.createDocumentFragment()
                        for (t = 0; token = tokens[t++]; ) {
                            if (token.expr) {
                                nodeIndex++
                                var signature = "v-" + token.type + pid + "." + nodeIndex
                                token.signature = signature
                                signature += ":" + token.value + (token.filters ? "|" + token.filters.join("|") : "")
                                var start = doc.createComment(signature)
                                var end = doc.createComment(signature + ":end")
                                token.element = end
                                bindings.push(token)
                                fragment.appendChild(start)
                                fragment.appendChild(end)
                            } else {
                                fragment.appendChild(doc.createTextNode(token.value))
                            }
                        }
                        parent.replaceChild(fragment, node)
                    }
                }
                break
            case 8:
                var nodeValue = node.nodeValue //如果后端渲染时已经生成好注释节点
                if (nodeValue.slice(-4) !== ":end" && rvtext.test(nodeValue)) {
                    nodeIndex++
                    var content = nodeValue.replace(rvtext, function (a) {
                        signature = a
                        return ""
                    })
                    token = getToken(content)
                    token.element = node
                    token.signature = signature
                    token.type = nodeValue.indexOf("v-text") === 0 ? "text" : "html"
                    bindings.push(token)
                }
                break
        }
    }

    if (bindings.length) {
        if (!isVirtual && inDom) { //如果是扫描真实DOM树，那么我们需要在虚拟DOM树复制这一部分节点
            vparent = VTree.queryVID(parent.getAttribute("data-vid"))
            vparent.childNodes.length = 0
            nodeIndex = 0
            for (i = 0, node; node = parent.childNodes[i]; i++) {
                switch (node.nodeType) {
                    case 1:
                        var vnode = VDOC.createElement(node.tagName, vparent)
                        vnode.vid = pid + "." + nodeIndex++
                        break
                    case 3:
                        var vnode = VDOC.createTextNode(node.valueNode)
                        vparent.appendChild(vnode)
                        break
                    case 8:
                        nodeValue = node.nodeValue
                        if (nodeValue.slice(-4) !== ":end" && rvtext.test(nodeValue)) {
                            nodeIndex++
                        }
                        var vnode = VDOC.createComment(nodeValue)
                        vparent.appendChild(vnode)
                        break

                }
            }
            executeBindings(bindings, vmodels)
        }
        for (i = 0; node = nodes[i++]; ) {
            scanElement(node, node.nodeType, vmodels)
        }
    }
}
function scanElement(node, nodeType, vmodels) {
    if (nodeType === 1) {
        if (node.isVirtual) {
            scanVTag(node, vmodels)
        } else {
            scanTag(node, vmodels) //扫描元素节点
        }
        if (node.msCallback) {
            node.msCallback()
            node.msCallback = void 0
        }
    }
}
var rvtext = /^v-(w+)[\.\d]+\:/
//实现一个能选择文本节点的选择器
// tagName, vid@8