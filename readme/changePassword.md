Change Password
Regresar

Entrada (Json): -oldPassword (campo requerido) -newPassword (campo requerido) -confirmnewPassword (campo requerido)
que cumplan con letra mayuscula, minuscula, número y caracter especial

	"oldPassword": "Npassword.1",
	"newPassword": "Npassword.2",
	"confirmnewPassword": "Npassword.2"
}

Salida
Status code 201 updated password

Status code 401 password does not match

Status code 401 User does not exist
