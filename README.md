# CESTOU

<br/>
<br/>
<br/>

<h2 style=color:#212121>FUNCIONALIDADES</h2>

<h3 style=color:#212121>Produtor</h3>

- Cadastro de Usuário e Login
- Perfil do Usuário
- Cadastro de Cestas
- Chave PIX 

<h3 style=color:#212121>Consumidor</h3>

<ul>
    <li>Cadastro de Usuário e Login</li>
    <li>Perfil do Usuário</>
    <li>Assinar uma cesta</li>
    <li>Remover items items que não deseja em sua cesta</li>
    <li>Link para conversar com o produtor da sua cesta pelo whatsapp</li>
</ul>


## <h2 style=color:#212121>COMO EXECUTAR</h2>

```bash
# Clone o projeto para o seu computador
$ git clone git@bitbucket.org:iamfelima/cestouv2.git

# No diretório raiz, executar
$ yarn install

# Executar app no emulador android
$ yarn run android

```

<br/>

## <h2 style=color:#212121>EXECUTAR OS TESTES E2E NO EMULADOR ANDROID</h2> 

```bash
# Configurar o advname do emulador android no arquivo que está usando, no arquivo ".detoxrc.json".

# Build uma apk debug para o test
$ yarn run e2e:android:build

# Iniciar um serve para rodar a aplicação
$ yarn start

# Iniciar os testes e2e
$ yarn run e2e:android:test

```