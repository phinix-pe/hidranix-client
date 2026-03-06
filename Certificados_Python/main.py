import pandas as pd

from PIL import Image, ImageDraw, ImageFont

import qrcode

import os

import random

import string



# ---------- CONFIG  H2V----------

PLANTILLA1_PATH = "1.png"

PLANTILLA2_PATH = "2.png"



CARPETA_PDFS = "certificados_finales"

CSV_SALIDA = "certificados_generados.csv"



FONT_PATH = "C:/Windows/Fonts/BRLNSR.ttf"



# URL FIJA DEL QR  (¡¡ESTA NO CAMBIA!!)

QR_URL_FIJA = "https://phinix.com.pe/econix/ValidarCertificado"



# URL dinámica para el CSV

BASE_URL_PUBLICA = "https://phinix.com.pe/certs/"



POSICIONES = {

    # Hemos asumido que el centro horizontal es 500.

    'X_CENTER': 800, 

    'CODE':788,

    # Nombre del alumno (debajo de "OTORGADO A:") 

    'nombre_alumno_Y': 950, 

    

    # DNI del alumno (debajo de "DNI N°:") 

    'dni_alumno_Y': 828,

    

    # Posición para el QR (Esquina superior derecha) 

    'qr_posicion': (660, 130), 

    

    # Texto encima del QR ("Creado por Nosotros")

    'qr_texto_creador_X': 920, # X-Center para la etiqueta

    'qr_texto_creador_Y': 140, 



    # Código Único de Verificación (dentro de la caja verde) 

    'codigo_solo_Y': 1122, 

}





# ---------- UTILIDADES ----------

def generar_codigo_unico(prefijo="SSOMA-2025-", length=5):

    chars = string.ascii_uppercase + string.digits

    return prefijo + ''.join(random.choice(chars) for _ in range(length))





def texto_centrado(draw, text, font, x_center, y, fill=(0,0,0)):

    bbox = draw.textbbox((0,0), text, font=font)

    w = bbox[2] - bbox[0]

    draw.text((x_center - w/2, y), text, font=font, fill=fill)





# ---------- GENERAR PDF ----------

def crear_pdf(datos):

    nombre = datos["nombre_completo"].upper()

    dni = datos["dni"]

    codigo = datos["codigo_unico"]



    img1 = Image.open(PLANTILLA1_PATH).convert("RGB")

    img2 = Image.open(PLANTILLA2_PATH).convert("RGB")



    draw1 = ImageDraw.Draw(img1)

    draw2 = ImageDraw.Draw(img2)



    # Fuentes

    font_nombrep1 = ImageFont.truetype(FONT_PATH, 75)

    font_nombrep2 = ImageFont.truetype(FONT_PATH, 40)

    font_dni = ImageFont.truetype(FONT_PATH, 45)

    font_codigo = ImageFont.truetype(FONT_PATH, 50)

    color_principal = (0, 0, 0) 

    # --- PLANTILLA 1 ---

    texto_centrado(draw1, nombre.title(), font_nombrep1, 775, 650)



    # --- PLANTILLA 2 ---

    bbox_name = draw2.textbbox(xy=(0, 0), text=nombre, font=font_nombrep2)

    w_name = bbox_name[2] - bbox_name[0]

    

    draw2.text((POSICIONES['X_CENTER']+185, POSICIONES['nombre_alumno_Y']+25), 

               nombre, 

               fill=color_principal, 

               font=font_nombrep2) 

    #texto_centrado(draw2, nombre.title(), font_nombrep2, 1120, 940)

    texto_centrado(draw2, dni, font_dni, 935, 1020)

    

    bbox_code = draw2.textbbox(xy=(0, 0), text=codigo, font=font_codigo)

    w_code = bbox_code[2] - bbox_code[0]

    draw2.text((POSICIONES['CODE']-3, POSICIONES['codigo_solo_Y']-10), 

               codigo, 

               fill=(255,255,255),  #fill=(39, 78, 59),

               font=font_codigo) 

    #texto_centrado(draw2, codigo, font_codigo, 1000, 940)
