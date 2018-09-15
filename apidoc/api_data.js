define({ "api": [
  {
    "type": "get",
    "url": "/article/:aid",
    "title": "获取article详情",
    "name": "article",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "aid",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/articles.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/articles",
    "title": "获取所有articles",
    "name": "articleList",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>article的标签</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/articles.js",
    "groupTitle": "Article"
  },
  {
    "type": "put",
    "url": "/article/:aid",
    "title": "修改article内容",
    "name": "changeArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>article的标题部分</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>article的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>article上次修改时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>article上次修改时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5004",
            "description": "<p>article标题长度应小于50且大于1</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5005",
            "description": "<p>article内容长度应小于31000且大于1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3006",
            "description": "<p>article修改成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/articles.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/articles/:uid",
    "title": "获取所有articles",
    "name": "userArticleList",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "uid",
            "description": "<p>发布者的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/articles.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/article",
    "title": "发布article",
    "name": "writeArticle",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>article的标题部分</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "author",
            "description": "<p>(可选) article的发布者</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>article的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>article上次修改时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tags",
            "description": "<p>article上次修改时间</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "seed",
            "description": "<p>(可选)article诞生自哪个种子</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5004",
            "description": "<p>article标题长度应小于50且大于1</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5005",
            "description": "<p>article内容长度应小于31000且大于1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3005",
            "description": "<p>article发布成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/articles.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/comments/:aid",
    "title": "请求所有评论",
    "name": "getComments",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "aid",
            "description": "<p>目标文章的ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/comments.js",
    "groupTitle": "Comment"
  },
  {
    "type": "post",
    "url": "/comments/:aid",
    "title": "发布评论",
    "name": "postComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "aid",
            "description": "<p>目标文章的ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "content",
            "description": "<p>目标文章的ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "createdTime",
            "description": "<p>comment创建时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tempNick",
            "description": "<p>comment显示昵称(未登录情况下)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "creator",
            "description": "<p>comment创造者的ID(登录情况下)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5001",
            "description": "<p>内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1)</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5005",
            "description": "<p>内容长度应小于35并大于1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3001",
            "description": "<p>发布评论成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/comments.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/comments/reply/:cid",
    "title": "修改评论",
    "name": "putReply",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "cid",
            "description": "<p>目标评论的ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>回复内容</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5001",
            "description": "<p>内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3002",
            "description": "<p>修改评论成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/comments.js",
    "groupTitle": "Comment"
  },
  {
    "error": {
      "fields": {
        "Quicklad": [
          {
            "group": "Quicklad",
            "optional": false,
            "field": "5001",
            "description": "<p>内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1) (Quicklad) 5002 Quick 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) (Quicklad) 5003 Quick 必需创建时间(quicklad need createdTime)</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "app/routes/comments.js",
    "group": "F__workflow_IMPACT_annihilate_app_routes_comments_js",
    "groupTitle": "F__workflow_IMPACT_annihilate_app_routes_comments_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Quicklad": [
          {
            "group": "Quicklad",
            "optional": false,
            "field": "2001",
            "description": "<p>Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1) (Quicklad) 5002 Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) (Quicklad) 5003 Quicklad 必需创建时间(quicklad need createdTime)</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "group": "F__workflow_IMPACT_annihilate_app_routes_quicklads_js",
    "groupTitle": "F__workflow_IMPACT_annihilate_app_routes_quicklads_js",
    "name": ""
  },
  {
    "type": "put",
    "url": "/lads/:id",
    "title": "修改Quicklad内容",
    "name": "changeLad",
    "group": "Quicklad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Quicklad创造者的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Quicklad更改后的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Quicklad更改后的颜色</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5001",
            "description": "<p>Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1)</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5002",
            "description": "<p>Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3004",
            "description": "<p>Quicklad 修改成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "groupTitle": "Quicklad"
  },
  {
    "type": "get",
    "url": "/lads",
    "title": "请求所有Quicklad",
    "name": "getAllLads",
    "group": "Quicklad",
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "groupTitle": "Quicklad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lads/:color",
    "title": "根据color请求所有Quicklad",
    "name": "getColorLads",
    "group": "Quicklad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>在(red/purple/green/black/blue/yellow)中选择</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>(分页) 请求的起始位置。</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>(分页) 请求单次个数。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>(分页) 请求的排序方式。</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "groupTitle": "Quicklad"
  },
  {
    "type": "post",
    "url": "/lads",
    "title": "发布Quicklad",
    "name": "postLabs",
    "group": "Quicklad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Quicklad内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Quicklad颜色</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "createdTime",
            "description": "<p>Quicklad创建时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Quicklad上次修改时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tempNick",
            "description": "<p>Quicklad显示昵称(未登录情况下)</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "creator",
            "description": "<p>Quicklad创造者的ID(登录情况下)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "5001",
            "description": "<p>Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1)</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5002",
            "description": "<p>Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list)</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "5003",
            "description": "<p>Quicklad 必需创建时间(quicklad need createdTime)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "optional": false,
            "field": "3003",
            "description": "<p>Quicklad 发布成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "groupTitle": "Quicklad"
  }
] });
