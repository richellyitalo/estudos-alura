from django.db import models

# Create your models here.
class Perfil(object):
    def __init__(self, nome='', email='', telefone='', empresa_nome=''):
        self.nome = nome
        self.email = email
        self.telefone = telefone
        self.empresa_nome = empresa_nome