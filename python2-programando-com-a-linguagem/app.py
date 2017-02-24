# -*- coding: UTF-8 -*-

def cadastrar(nomes):
    print 'Digite seu nome:'
    nome = raw_input()
    nomes.append(nome)

def listar(nomes):
    print 'Listando nomes:'
    for nome in nomes:
        print nome

def remover(nomes):
    print 'Qual nome deseja remover?'
    nome = raw_input()
    nomes.remove(nome)

def alterar(nomes):
    print 'Qual nome deseja alterar?'
    nome = raw_input()
    if nome in nomes:
        posicao = nomes.index(nome)
        nome_antigo = nomes[posicao]
        print 'Informe o novo nome:'
        nome_novo = raw_input()
        nomes[posicao] = nome_novo
        print 'Alteração %s => %s' % (nome_antigo, nome_novo)
    else:
        print 'Esse nome não está na lista'

def procurar(nomes):
    print 'Qual nome deseja procurar?'
    nome = raw_input()
    
    if nome in nomes:
        print 'Nome encontrado %s' % nome
    else:
        print 'Nome não encontrado %s' nome

def menu():
    nomes = []
    escolha = ''

    while escolha != '0':
        print '1 - Cadastro, 2 - Listar, 3 - Remover, 4 - Alterar, 5 - Procurar, 0 - Sair'
        escolha = raw_input()

        if escolha == '1':
            cadastrar(nomes)

        if escolha == '2':
            listar(nomes)

        if escolha == '3':
            remover(nomes)

        if escolha == '4':
            alterar(nomes)

        if escolha == '5':
            procurar(nomes)

menu()