return {
  "$schema": {
    "title": "SchemeModel",
    "type": "object",
    "properties": {
      "name": {
        "type": [
          "null",
          "string"
        ]
      },
      "isSingleton": {
        "type": "boolean"
      },
      "isPublished": {
        "type": "boolean"
      },
      "schema": {
        "oneOf": [
          {
            "type": "null"
          },
          {}
        ]
      }
    },
    "definitions": {
      "SynchronizeSchemaDto": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "properties": {
            "oneOf": [
              {
                "type": "null"
              },
              {}
            ]
          },
          "scripts": {
            "oneOf": [
              {
                "type": "null"
              },
              {}
            ]
          },
          "fieldsInReferences": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "fieldsInLists": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "fields": {
            "type": [
              "array",
              "null"
            ],
            "items": {}
          },
          "previewUrls": {
            "type": [
              "null",
              "object"
            ],
            "additionalProperties": {
              "type": "string"
            }
          },
          "category": {
            "type": [
              "null",
              "string"
            ]
          },
          "isPublished": {
            "type": "boolean"
          },
          "noFieldDeletion": {
            "type": "boolean"
          },
          "noFieldRecreation": {
            "type": "boolean"
          }
        }
      },
      "SchemaPropertiesDto": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "contentsSidebarUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "contentSidebarUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "contentEditorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "validateOnPublish": {
            "type": "boolean"
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          }
        }
      },
      "SchemaScriptsDto": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "query": {
            "type": [
              "null",
              "string"
            ]
          },
          "create": {
            "type": [
              "null",
              "string"
            ]
          },
          "update": {
            "type": [
              "null",
              "string"
            ]
          },
          "delete": {
            "type": [
              "null",
              "string"
            ]
          },
          "change": {
            "type": [
              "null",
              "string"
            ]
          }
        }
      },
      "UpsertSchemaFieldDto": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "name",
          "properties"
        ],
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "pattern": "^[a-zA-Z0-9]+(\\-[a-zA-Z0-9]+)*$"
          },
          "isHidden": {
            "type": "boolean"
          },
          "isLocked": {
            "type": "boolean"
          },
          "isDisabled": {
            "type": "boolean"
          },
          "partitioning": {
            "type": [
              "null",
              "string"
            ]
          },
          "properties": {},
          "nested": {
            "type": [
              "array",
              "null"
            ],
            "items": {}
          }
        }
      },
      "FieldPropertiesDto": {
        "type": "object",
        "x-abstract": true,
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "ArrayFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "minItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "AssetsFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "previewMode": {},
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "folderId": {
            "type": [
              "null",
              "string"
            ]
          },
          "minItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "minSize": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxSize": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "minWidth": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxWidth": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "minHeight": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxHeight": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "aspectWidth": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "aspectHeight": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "mustBeImage": {
            "type": "boolean"
          },
          "resolveFirst": {
            "type": "boolean"
          },
          "resolveImage": {
            "type": "boolean",
            "x-deprecated": true,
            "x-deprecatedMessage": "Use ResolveFirst now"
          },
          "allowedExtensions": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "allowDuplicates": {
            "type": "boolean"
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "AssetPreviewMode": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "ImageAndFileName",
          "Image",
          "FileName"
        ],
        "enum": [
          "ImageAndFileName",
          "Image",
          "FileName"
        ]
      },
      "LocalizedValueOfStringOf": {
        "type": "object",
        "additionalProperties": false
      },
      "BooleanFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "boolean",
              "null"
            ]
          },
          "inlineEditable": {
            "type": "boolean"
          },
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "LocalizedValueOfNullableBoolean": {
        "type": "object",
        "additionalProperties": false
      },
      "BooleanFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Checkbox",
          "Toggle"
        ],
        "enum": [
          "Checkbox",
          "Toggle"
        ]
      },
      "DateTimeFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "null",
              "string"
            ],
            "format": "date-time"
          },
          "maxValue": {
            "type": [
              "null",
              "string"
            ],
            "format": "date-time"
          },
          "minValue": {
            "type": [
              "null",
              "string"
            ],
            "format": "date-time"
          },
          "editor": {},
          "calculatedDefaultValue": {
            "oneOf": [
              {
                "type": "null"
              },
              {}
            ]
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "LocalizedValueOfNullableInstant": {
        "type": "object",
        "additionalProperties": false
      },
      "DateTimeFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Date",
          "DateTime"
        ],
        "enum": [
          "Date",
          "DateTime"
        ]
      },
      "DateTimeCalculatedDefaultValue": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Now",
          "Today"
        ],
        "enum": [
          "Now",
          "Today"
        ]
      },
      "GeolocationFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "GeolocationFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Map"
        ],
        "enum": [
          "Map"
        ]
      },
      "JsonFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "NumberFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "null",
              "number"
            ],
            "format": "double"
          },
          "maxValue": {
            "type": [
              "null",
              "number"
            ],
            "format": "double"
          },
          "minValue": {
            "type": [
              "null",
              "number"
            ],
            "format": "double"
          },
          "allowedValues": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "number",
              "format": "double"
            }
          },
          "isUnique": {
            "type": "boolean"
          },
          "inlineEditable": {
            "type": "boolean"
          },
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "LocalizedValueOfNullableDouble": {
        "type": "object",
        "additionalProperties": false
      },
      "NumberFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Input",
          "Radio",
          "Dropdown",
          "Stars"
        ],
        "enum": [
          "Input",
          "Radio",
          "Dropdown",
          "Stars"
        ]
      },
      "ReferencesFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "minItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "allowDuplicates": {
            "type": "boolean"
          },
          "resolveReference": {
            "type": "boolean"
          },
          "mustBePublished": {
            "type": "boolean"
          },
          "editor": {},
          "schemaIds": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "fieldType": {
            "type": "string"
          }
        }
      },
      "ReferencesFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "List",
          "Dropdown",
          "Tags",
          "Checkboxes"
        ],
        "enum": [
          "List",
          "Dropdown",
          "Tags",
          "Checkboxes"
        ]
      },
      "StringFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "null",
              "string"
            ]
          },
          "pattern": {
            "type": [
              "null",
              "string"
            ]
          },
          "patternMessage": {
            "type": [
              "null",
              "string"
            ]
          },
          "folderId": {
            "type": [
              "null",
              "string"
            ]
          },
          "minLength": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxLength": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "minCharacters": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxCharacters": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "minWords": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxWords": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "allowedValues": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "isUnique": {
            "type": "boolean"
          },
          "inlineEditable": {
            "type": "boolean"
          },
          "contentType": {},
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "LocalizedValueOfString": {
        "type": "object",
        "additionalProperties": false
      },
      "StringContentType": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Unspecified",
          "Html",
          "Markdown"
        ],
        "enum": [
          "Unspecified",
          "Html",
          "Markdown"
        ]
      },
      "StringFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Input",
          "Color",
          "Markdown",
          "Dropdown",
          "Html",
          "Radio",
          "RichText",
          "Slug",
          "StockPhoto",
          "TextArea"
        ],
        "enum": [
          "Input",
          "Color",
          "Markdown",
          "Dropdown",
          "Html",
          "Radio",
          "RichText",
          "Slug",
          "StockPhoto",
          "TextArea"
        ]
      },
      "TagsFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "defaultValues": {},
          "defaultValue": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "minItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "maxItems": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32"
          },
          "allowedValues": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "TagsFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Tags",
          "Checkboxes",
          "Dropdown"
        ],
        "enum": [
          "Tags",
          "Checkboxes",
          "Dropdown"
        ]
      },
      "UIFieldPropertiesDto": {
        "type": "object",
        "required": [
          "fieldType"
        ],
        "properties": {
          "label": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "hints": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 1000,
            "minLength": 0
          },
          "placeholder": {
            "type": [
              "null",
              "string"
            ],
            "maxLength": 100,
            "minLength": 0
          },
          "isRequired": {
            "type": "boolean"
          },
          "isRequiredOnPublish": {
            "type": "boolean"
          },
          "isHalfWidth": {
            "type": "boolean"
          },
          "editorUrl": {
            "type": [
              "null",
              "string"
            ]
          },
          "tags": {
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "editor": {},
          "fieldType": {
            "type": "string"
          }
        }
      },
      "UIFieldEditor": {
        "type": "string",
        "description": "",
        "x-enumNames": [
          "Separator"
        ],
        "enum": [
          "Separator"
        ]
      },
      "UpsertSchemaNestedFieldDto": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "name",
          "properties"
        ],
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "pattern": "^[a-zA-Z0-9]+(\\-[a-zA-Z0-9]+)*$"
          },
          "isHidden": {
            "type": "boolean"
          },
          "isLocked": {
            "type": "boolean"
          },
          "isDisabled": {
            "type": "boolean"
          },
          "properties": {}
        }
      }
    }
  },
  "name": "users",
  "isSingleton": false,
  "isPublished": false,
  "schema": {
    "noFieldDeletion": false,
    "noFieldRecreation": false,
    "properties": {
      "label": "Users",
      "validateOnPublish": false
    },
    "scripts": {},
    "fieldsInReferences": [
      "firstName",
      "lastName",
      "orcid"
    ],
    "fieldsInLists": [
      "meta.status.color",
      "avatar",
      "firstName",
      "lastName",
      "orcid",
      "email",
      "onboarded",
      "connections",
      "adminNotes",
      "meta.id",
      "role",
      "labs",
      "teams",
      "degree",
      "country",
      "city",
      "institution",
      "jobTitle",
      "responsibilities",
      "researchInterests",
      "expertiseAndResourceDescription",
      "expertiseAndResourceTags",
      "questions",
      "biography",
      "social",
      "contactEmail",
      "orcidWorks",
      "orcidLastSyncDate",
      "reachOut",
      "meta.created",
      "meta.createdBy.avatar",
      "meta.lastModified",
      "meta.lastModifiedBy.avatar"
    ],
    "fields": [
      {
        "name": "separatorBasicData",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Basic Data ",
          "hints": "Mandatory for grantees - they can only publish profile if this section complete",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "firstName",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "First Name",
          "hints": "",
          "placeholder": "",
          "isRequired": true,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "lastName",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Last Name",
          "hints": "",
          "placeholder": "",
          "isRequired": true,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "email",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "pattern": "^[a-zA-Z0-9.!#$%&’*+\\/=?^_`'{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
          "isUnique": true,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Email",
          "isRequired": true,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "orcid",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "pattern": "^\\d{4}-\\d{4}-\\d{4}-\\d{3}(\\d|X)$",
          "patternMessage": "ORCID must have the following format: 0000-0000-0000-0000",
          "isUnique": true,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "ORCID",
          "hints": "Mandatory for grantees. They cannot publish profile without an ORCID. ORCIDs cannot be repeated on the Hub",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "labs",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "References",
          "allowDuplicates": false,
          "resolveReference": false,
          "mustBePublished": true,
          "editor": "List",
          "schemaIds": [
            "labs"
          ],
          "label": "Labs",
          "hints": "Mandatory for grantees. They cannot publish profile without a lab.",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "teams",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Array",
          "label": "Teams",
          "hints": "Mandatory for grantees. They cannot publish profile without a team.",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        },
        "nested": [
          {
            "name": "id",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "References",
              "minItems": 1,
              "maxItems": 1,
              "allowDuplicates": false,
              "resolveReference": false,
              "mustBePublished": false,
              "editor": "Dropdown",
              "schemaIds": [
                "teams"
              ],
              "label": "ID",
              "hints": "",
              "placeholder": "",
              "isRequired": true,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "role",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "allowedValues": [
                "Lead PI (Core Leadership)",
                "Co-PI (Core Leadership)",
                "Project Manager",
                "Collaborating PI",
                "Key Personnel"
              ],
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Dropdown",
              "label": "Role",
              "hints": "Attention: Check if this user needs to be added to Smart Simple",
              "isRequired": true,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          }
        ]
      },
      {
        "name": "separatorHeader",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Header Data",
          "hints": "General information that is shown on the profile's header",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "degree",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "allowedValues": [
            "BA",
            "BSc",
            "MD",
            "MSc",
            "MD, PhD",
            "PhD",
            "MPH",
            "MA",
            "MBA"
          ],
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Dropdown",
          "label": "Degree",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "country",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Country",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "city",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "City",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "jobTitle",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Job Title",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "institution",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Institution",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "contactEmail",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Correspondence Email",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "avatar",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Assets",
          "previewMode": "Image",
          "minItems": 0,
          "maxItems": 1,
          "mustBeImage": true,
          "resolveFirst": true,
          "resolveImage": true,
          "allowDuplicates": false,
          "label": "Avatar",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "social",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Array",
          "maxItems": 1,
          "label": "Social Links",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        },
        "nested": [
          {
            "name": "website1",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Website 1",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "website2",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Website 2",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "linkedIn",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "LinkedIn",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "researcherId",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Researcher ID",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "twitter",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Twitter",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "github",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Github",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "googleScholar",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Google Scholar",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "researchGate",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Research Gate",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          }
        ]
      },
      {
        "name": "separatorResearch",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Research Tab",
          "hints": "This data shows up in the first tab",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "responsibilities",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": false,
          "contentType": "Unspecified",
          "editor": "TextArea",
          "label": "Responsibilities",
          "hints": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "researchInterests",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": false,
          "contentType": "Unspecified",
          "editor": "TextArea",
          "label": "Research Interests",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "reachOut",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "minLength": 0,
          "maxLength": 250,
          "contentType": "Unspecified",
          "editor": "TextArea",
          "label": "Reach Out",
          "hints": "Reach out reasons (only relevant for \"Staff\" users)",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "expertiseAndResourceDescription",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Expertise and Resources Description",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "expertiseAndResourceTags",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Tags",
          "editor": "Tags",
          "label": "Expertise and Resources",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "questions",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Array",
          "minItems": 0,
          "maxItems": 4,
          "label": "Open Questions",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        },
        "nested": [
          {
            "name": "question",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Question",
              "hints": "",
              "placeholder": "",
              "isRequired": true,
              "isRequiredOnPublish": false,
              "isHalfWidth": false
            }
          }
        ]
      },
      {
        "name": "separatorBackground",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Background Tab",
          "hints": "This data shows up in the second tab",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "biography",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": false,
          "contentType": "Unspecified",
          "editor": "TextArea",
          "label": "Biography",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "separatorAdminNotes",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Admin Notes",
          "hints": "This is ASAP internal content and it's not being shown on the Hub",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "adminNotes",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": false,
          "contentType": "Unspecified",
          "editor": "TextArea",
          "label": "Admin Notes",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "separatorTechnical",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "UI",
          "editor": "Separator",
          "label": "Technical",
          "hints": "Fields used mostly by our API",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "onboarded",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Boolean",
          "defaultValue": false,
          "inlineEditable": true,
          "editor": "Toggle",
          "label": "Onboarding complete",
          "hints": "Use this to allow the user to see the full Hub and skip profile completion",
          "isRequired": true,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        }
      },
      {
        "name": "connections",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Array",
          "label": "Connections",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        },
        "nested": [
          {
            "name": "code",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Code",
              "hints": "",
              "placeholder": "",
              "isRequired": true,
              "isRequiredOnPublish": false,
              "isHalfWidth": false
            }
          }
        ]
      },
      {
        "name": "role",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "defaultValue": "Grantee",
          "allowedValues": [
            "Staff",
            "Grantee",
            "Guest",
            "Hidden"
          ],
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Dropdown",
          "label": "ASAP Hub Role",
          "hints": "Role on the ASAP Hub",
          "placeholder": "",
          "isRequired": true,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "orcidLastSyncDate",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "ORCID Last Sync Date",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "orcidLastModifiedDate",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": true,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "ORCID Last Modified Date",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "lastModifiedDate",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "String",
          "isUnique": false,
          "inlineEditable": false,
          "contentType": "Unspecified",
          "editor": "Input",
          "label": "Last Modified Date",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": true
        }
      },
      {
        "name": "orcidWorks",
        "isHidden": false,
        "isLocked": false,
        "isDisabled": false,
        "partitioning": "invariant",
        "properties": {
          "fieldType": "Array",
          "label": "ORCID Works",
          "hints": "",
          "placeholder": "",
          "isRequired": false,
          "isRequiredOnPublish": false,
          "isHalfWidth": false
        },
        "nested": [
          {
            "name": "id",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": false,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "ID",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "doi",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "DOI",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "title",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Title",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "type",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Type",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "lastModifiedDate",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "String",
              "isUnique": false,
              "inlineEditable": true,
              "contentType": "Unspecified",
              "editor": "Input",
              "label": "Last Modified Date",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          },
          {
            "name": "publicationDate",
            "isHidden": false,
            "isLocked": false,
            "isDisabled": false,
            "properties": {
              "fieldType": "Json",
              "label": "Publication Date",
              "hints": "",
              "placeholder": "",
              "isRequired": false,
              "isRequiredOnPublish": false,
              "isHalfWidth": true
            }
          }
        ]
      }
    ],
    "previewUrls": {
      "Web": "https://hub.asap.science/network/users/${id}"
    },
    "fieldRules": [],
    "category": "Storage",
    "isPublished": true
  }
}
