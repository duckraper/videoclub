from random import randint
from time import time


def ordenamiento_seleccion(numeros):
    for i in range(len(numeros)):
        minimo = i
        for j in range(i + 1, len(numeros)):
            if numeros[j] < numeros[minimo]:
                minimo = j
        aux = numeros[i]
        numeros[i] = numeros[minimo]
        numeros[minimo] = aux

    return numeros


def ordenamiento_burbuja(numeros):
    for i in range(len(numeros) - 1):
        for j in range(len(numeros) - 1):
            if numeros[j] > numeros[j + 1]:
                aux = numeros[j]
                numeros[j] = numeros[j + 1]
                numeros[j + 1] = aux

    return numeros


# medir tiempo de ejecucion
array = [randint(10, 90000) for _ in range(10000)]
# print("arreglo desordenado: \n", array)

inicio1 = time()
ordenamiento_seleccion(array)
print("Tiempo de ejecucion (selecccion): ", time() - inicio1)

inicio2 = time()
ordenamiento_burbuja(array)
print("Tiempo de ejecucion (burbuja): ", time() - inicio2)

inicio3 = time()
array.sort()
print("Tiempo de ejecucion (quick): ", time() - inicio3)

inicio4 = time()
set(array)
print("Tiempo de ejecucion (conjunto): ", time() - inicio4)
