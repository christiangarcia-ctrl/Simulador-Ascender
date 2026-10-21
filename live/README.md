# GarBa Retiro LIVE

Vista independiente en /live/. No modifica index.html ni mobile.html.

Fuente inspeccionada: christiangarcia-ctrl/Simulador-Ascender, commit 0f7b2d6b8e35ccf411618a6b00a916d3aefeb129.

## Cálculos

calculator.js adapta calcAccum del original: depósitos al cierre de cada mes, capitalización mensual y aumento anual de aportación por inflación. Conserva los supuestos predeterminados internos del original (10% nominal anual y 4% de inflación); no presenta tasas en pantalla. Sin depósito inicial ni beneficio fiscal. La aportación continúa hasta la edad elegida; el original tenía corte fijo a 65. La extensión hasta 80 es una simulación matemática, no validación de elegibilidad de un producto.

El equivalente mensual usa calcRet del original: anualidad a 240 meses con supuesto nominal interno de 7% anual, pagos nominales constantes. No es una pensión garantizada ni retiro ajustado cada año por inflación. La comparación con la meta convierte el pago inicial a pesos de hoy descontando 4% por año hasta el retiro; no representa cobertura del poder adquisitivo durante todo el periodo de retiro.

Ejemplo 40 → 65, $3,000 mensuales iniciales: capital $5,470,515.63, aportaciones $1,499,252.70 y equivalente nominal aproximado $42,413/mes. Los montos de la imagen de referencia no se usan como resultados.

## Uso y encuadre

Servir el repositorio por HTTP local y abrir /live/. Cámara requiere localhost o HTTPS y permiso del navegador. Audio no solicitado. Activar y apagar cámara desde la vista; no existe grabación ni carga de video. Alternativamente, colocar una cámara real como fuente inferior en el programa de transmisión.

Lienzo 1080×1920; panel superior 1080×960 y cámara inferior 1080×960. Escala proporcional en pantallas más estrechas. Recomendado capturar al tamaño nativo. La cabecera reutiliza logo-allianz-distribuidor.jpg del repositorio original, conservado como allianz.jpg; incluye el texto Distribuidor autorizado aprobado por el usuario. No se generaron rostros ni fotografías.

## Estado

Solo implementación local. Sin commit, push ni publicación. Pruebas y capturas entregadas por separado. Acceso a cámara física pendiente de permiso y comprobación manual del usuario. La prueba automatizada verifica el manejo de denegación, no demuestra video real ni una transmisión TikTok completa.
