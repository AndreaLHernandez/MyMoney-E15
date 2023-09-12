## Crear Etiqueta
[Regresar](.)

- Entrada (Json): descripción, tipo (ENUM(ingreso, egreso)), clasificación (ENUM(fijo, variable)) y color.
```
{
	"description": "Alimentos",
	"type": "egreso",
	"classification": "variable",
	"color":"rojo"
}
```

- Salida
```
Status code 201 Tag created succesfully

Status code 401 Tag exists
```
