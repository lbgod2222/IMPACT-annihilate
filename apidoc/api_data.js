define({ "api": [
  {
    "error": {
      "fields": {
        "Quicklad": [
          {
            "group": "Quicklad",
            "optional": false,
            "field": "5001",
            "description": "<p>Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars &amp; more than 1) (Quicklad) 5002 Quick 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) (Quicklad) 5003 Quick 必需创建时间(quicklad need createdTime)</p>"
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
    "version": "0.0.0",
    "filename": "app/routes/quicklads.js",
    "groupTitle": "Quicklad"
  }
] });
