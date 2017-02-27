from django.shortcuts import render
from perfis.models import Perfil
#from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')
    #return HttpResponse('Bem vindo ao iCode!')

def perfil(request, perfil_id):
    perfil = Perfil()
    if perfil_id == '1':
        perfil = Perfil('Rich', 'rich@rich.com', '888', 'Mais')
    if perfil_id == '2':
        perfil = Perfil('Steven', 'steven@steven.com', '999')

    return render(request, 'perfil.html', {'perfil': perfil})
