# -*- coding: utf-8 -*-

class Perfil(object):
    'Class do perfil'

    def __init__(self, nome, telefone, empresa):
        self.nome = nome
        self.telefone = telefone
        self.empresa = empresa
        self.__curtidas = 0

    def imprimir(self):
        print( 'Nome: %s, telefone: %s, empresa: %s' % (self.nome, self.telefone, self.empresa))

    def curtir(self):
        self.__curtidas += 1

    def obter_curtidas(self):
        return self.__curtidas

class Perfil_Vip(Perfil):
    def __init__(self, nome, telefone, empresa, apelido):
        super(Perfil_Vip, self).__init__(nome, telefone, empresa)
        self.apelido = apelido

    def obter_credito(self):
        return super(Perfil_Vip, self).obter_curtidas() * 10.00

class Data(object):
    'Classe que informa a data'

    def __init__(self, dia, mes, ano):
        self.dia = dia
        self.mes = mes
        self.ano = ano

    def imprime(self):
        print( '%s/%s/%s' % (self.dia, self.mes, self.ano))

class Pessoa(object):

    def __init__(self, nome, peso, altura):
        self.nome = nome
        self.peso = peso
        self.altura = altura

    def imprime_imc(self):
        imc = self.peso / (self.altura * self.altura)
        print('Imc de %s: %s' % (self.nome, imc))

class Conta(object):

    def __init__(self, titular, saldo):
        self.titular = titular
        self.saldo = saldo

    def calcular_imposto(self):
        self.saldo = self.saldo * 0.10
        return self.saldo

class Conta_Corrente(Conta):
    def __init__(self, titular, saldo, bonus):
        super(Conta_Corrente, self).__init__(titular, saldo)
        self.bonus = bonus

    def calcular_imposto(self):
        return super(Conta_Corrente, self).calcular_imposto() + self.bonus