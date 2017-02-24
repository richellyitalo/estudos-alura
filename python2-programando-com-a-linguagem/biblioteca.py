def gera_nome_convite(convite):
    posica_final = len( convite )
    posicao_inicial = posica_final - 4;

    parte1 = convite[0:4]
    parte2 = convite[ posicao_inicial: posica_final]

    return parte1 + ' ' + parte2

def envia_convite(convite):
    print 'Enviado convite para %s' % (convite)

def processa_convite(convite):
    nome_formatado = gera_nome_convite(convite)
    envia_convite(nome_formatado)