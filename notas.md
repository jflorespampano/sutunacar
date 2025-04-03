## NSS

El Número de Seguro Social (NSS) en México está compuesto por 11 dígitos que tienen un significado específico. 
Los primeros dos dígitos están vinculados a la subdelegación en la que la persona fue afiliada, 
los dos siguientes indican el año en que la persona se afilió al Seguro Social, 
los siguientes dos corresponden a la fecha de nacimiento del afiliado, y 
los cuatro números siguientes son los dígitos que asigna el IMSS al trabajador. 
El último dígito es el número de verificación del trabajador en el IMSS.

Para calcular el dígito verificador, cada uno de los primeros 10 dígitos se multiplica por una secuencia de números (1-2-1-2-1-2-1-2-1-2), los resultados se suman y se resta la diferencia para llegar a la siguiente decena. Este proceso da como resultado el dígito verificador, que no es aleatorio y es parte integral del NSS.

## matriz de pruebas

| Caso      | NSS           | edad | fecha ingreso |   |
|-----------|---------------|------|---------------|---|
| caso 1    | 62146429101   | 40   | 01/02/2014    |   |
| caso 2    | 62876429101   | 40   | 01/02/2014    |g2 complementaria|
| caso 3    | 62146429101   | 66   | 01/02/2014    |   |
| caso 4    | 62876429101   | 66   | 01/02/1987    |   |



