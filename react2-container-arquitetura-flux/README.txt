#LINKS UT�IS
http://node.green/
https://github.com/alberto-alura/projeto-instalura-curso

#SERVER
Antes de come�armos a implementar nosso c�digo do Instalura, j� vamos deixar a API rodando. Abra um terminal e navegue at� a pasta onde voc� realizou o download do jar. A partir dessa pasta, execute o seguindo comando:

java -jar instalura.jar.

Se o seu banco tiver uma senha diferente de vazio, rode o comando conforme explicado abaixo.

Acesse o endere�o 
http://localhost:8080/gera/dados
http://localhost:8080/api/public/fotos/alots
http://localhost:8080/api/public/login
http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}
http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}
http://localhost:8080/api/fotos/{loginPesquisado}


java -jar -Dspring.datasource.password=suaSenhaAqui instalura.jar