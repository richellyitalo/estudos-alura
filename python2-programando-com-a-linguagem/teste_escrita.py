arquivo = open('teste.txt', 'a')
arquivo.write('Python é foda \n')
print(arquivo.mode)
arquivo.close()