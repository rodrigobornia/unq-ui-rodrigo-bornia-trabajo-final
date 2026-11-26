# Palabras Encadenadas — Trabajo Final Integrador (UIs - UNQ)

Aplicación web desarrollada en **React** para el Trabajo Final Integrador de la materia **Construcción de Interfaces de Usuario (UNQ - 2°C 2026)**.

## Descripción del juego

El objetivo es formar la cadena más larga posible de palabras válidas en español antes de que se agote el tiempo:

- Cada turno dura **15 segundos** y comienza al ingresar la primera palabra válida.
- Cada palabra nueva debe empezar con la **última letra** de la palabra anterior, no haberse utilizado previamente en la partida y existir en el diccionario español.
- Cada letra de una palabra válida suma **1 punto** y reinicia el temporizador a 15 segundos.
- Al finalizar la partida se muestra el resumen (palabras encadenadas y puntaje final), un ranking local con los **10 mejores puntajes** y la posibilidad de iniciar una nueva partida.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (incluido con Node.js)

## Cómo descargar e instalar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/rodrigobornia/unq-ui-rodrigo-bornia-trabajo-final.git](https://github.com/rodrigobornia/unq-ui-rodrigo-bornia-trabajo-final.git)