! function () {
  var view = document.querySelector(".messageSite")

  var model = {
    init: function () {
      var APP_ID = 'JmXswqjHuBfnsEC9apsWGJFk-gzGzoHsz'
      var APP_KEY = 'JftIHfGzPalsGsuyhf2ndQQB'

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
    },
    fetch: function () {
      var query = new AV.Query('Message')
      return query.find()
    },
    save: function (name, content) {
      var Message = AV.Object.extend('Message')
      message = new Message()
      return message.save({
        name: name,
        content: content
      })
    }
  }
  var controller = {
    view: null,
    model: null,
    messageList: null,
    form: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.model.init()
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#messageForm')
      this.loadMessage()
      this.bindEvents()
    },
    loadMessage: function () {
      this.model.fetch()
        .then((messages) => {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.name}:${item.content}`
              this.messageList.appendChild(li)
            })
          },
          function (error) {
            alert('获取留言失败，等一会再来吧~')
          }
        )
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let content = this.form.querySelector('input[name=content]').value
      let name = this.form.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}:${object.attributes.content}`
        messageList.appendChild(li)
        this.form.querySelector('input[name=content]').value = ''
        this.form.querySelector('input[name=name]').value = ''
      })
    }
  }
  controller.init(view, model)
}.call()