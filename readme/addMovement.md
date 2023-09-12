## Añadir Movimiento
[Regresar](.)

EGRESO
-Entrada (Json):
-Descripcion (campo requerido)
-Fecha del movimiento (fecha)
-Importe del movimiento (numerico)
-Concepto  (listado preestablecido)
-Número de cuenta asociada
-Imagen del ticket (Campo no requerido)
-Tipo del movimiento(egreso)
-color(listado preestablecido)
```
{
	"description":"egreso",
	"movementDate": "2022-05-17",
	"amount": "20",
	"concept":"renta",
    "image":"data:image/png;base64",
    "account":"11322000004444446",
    "typeMov": "egreso",
	"color":"rojo",
}
```

- Salida
```
Status code 201 movement created succesfully

Status code 401 errors required data
```
INGRESO
-Entrada (Json):
-Descripcion (campo requerido)
-Fecha del movimiento (fecha)
-Importe del movimiento (numerico)
-Concepto  (listado preestablecido)
-Número de cuenta asociada
-Tipo del movimiento(ingreso)
-color(listado preestablecido)
```
{
	"description":"egreso",
	"movementDate": "2022-05-17",
	"amount": "20",
	"concept":"renta",
    "account":"11322000004444446",
    "typeMov": "ingreso",
	"color":"rojo",
}
```

- Salida
```
Status code 201 movement created succesfully

Status code 401 errors required data
```