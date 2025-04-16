## NSS

El Número de Seguro Social (NSS) en México está compuesto por 11 dígitos que tienen un significado específico. 
Los primeros dos dígitos están vinculados a la subdelegación en la que la persona fue afiliada, 
los dos siguientes indican el año en que la persona se afilió al Seguro Social, 
los siguientes dos corresponden a la fecha de nacimiento del afiliado, y 
los cuatro números siguientes son los dígitos que asigna el IMSS al trabajador. 
El último dígito es el número de verificación del trabajador en el IMSS.

Para calcular el dígito verificador, cada uno de los primeros 10 dígitos se multiplica por una secuencia de números (1-2-1-2-1-2-1-2-1-2), los resultados se suman y se resta la diferencia para llegar a la siguiente decena. Este proceso da como resultado el dígito verificador, que no es aleatorio y es parte integral del NSS.

## matriz de pruebas

|numEmp  | NSS           | edad | fecha ingreso |   |
|--------|---------------|------|---------------|---|
| 501    | 62886429101   | 40   | 01/02/1988    |   |
| 502    | 62886429158   | 50   | 01/02/2014    |g2 complementaria|
| 503    | 72046429984   | 25   | 01/02/2004    |   |




## contar

```sql
/*contar femenino*/
SELECT COUNT(*) 
FROM empleados 
WHERE sexo = 'F';

/*contar masculino*/
SELECT COUNT(*) 
FROM empleados 
WHERE sexo = 'M';

/*contar todos*/
SELECT COUNT(*) 
FROM empleados;

/*contar docentes*/
SELECT count(*) 
FROM empleados 
WHERE puesto like 'd%';

/*contar administrativos*/
SELECT count(*) 
FROM empleados 
WHERE puesto IN ('AAA', 'AA2', 'AAB', 'AAC','AAD','A01');

/*contar manuales*/
SELECT count(*) 
FROM empleados 
WHERE puesto IN ('AMB', 'AMC', 'ATA', 'ATB','ATC','ATD','A79');

/*Generacion 2 si*/
SELECT count(*)
FROM empleados
WHERE '2003-09-18' < fecha_ingreso_unacar;
```