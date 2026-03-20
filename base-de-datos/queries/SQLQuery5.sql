SELECT TOP (1000) [ProductID]
      ,[Name]
      ,[ProductNumber]
      ,[Color]
      ,[StandardCost]
      ,[ListPrice]
      ,[Size]
      ,[Weight]
      ,[ProductCategoryID]
      ,[ProductModelID]
      ,[SellStartDate]
      ,[SellEndDate]
      ,[DiscontinuedDate]
      ,[ThumbNailPhoto]
      ,[ThumbnailPhotoFileName]
      ,[rowguid]
      ,[ModifiedDate]
  FROM [AdventureWorksLT2022].[SalesLT].[Product]

  
  
  SELECT distinct Color as product_color from SalesLT.Product 
  where Color is not null

  DECLARE @PAGE_NUMBER INT =2;
  DECLARE @ROWS_PER_PAGE INT = 3;

  SELECT distinct Color as product_color from SalesLT.Product 
  where Color is not null
  order by Color
  offset (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE rows
  fetch next @ROWS_PER_PAGE rows only
 

  DECLARE @PAGE_NUMBER INT =3;
  DECLARE @ROWS_PER_PAGE INT = 10;

  SELECT * from SalesLT.Customer
  order by CustomerID
  offset (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE rows
  fetch next @ROWS_PER_PAGE rows only
  

  DECLARE @PAGE_NUMBER INT =3;
  DECLARE @ROWS_PER_PAGE INT = 10;

  SELECT * from SalesLT.ProductCategory
  order by Name DESC
  offset (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE rows
  fetch next @ROWS_PER_PAGE rows only



  --LIKE
  select * from SalesLT.Customer
  where FirstName LIKE '%R%'

  select * from SalesLT.Customer
  where FirstName LIKE 'Robert'


  --BETWEEN
 select FirstName, LastName, ModifiedDate from SalesLT.Customer
 where ModifiedDate between '2005-08-01' and '2007-07-01'


 --Count
 select count(*) as total_custumers from SalesLT.Customer

 select distinct count(*) from SalesLT.Customer
 

 --SUM
 select SUM(TotalDue) as total_ventas from SalesLT.SalesOrderHeader

 select ProductCategoryID as categoria, count(ProductCategoryID) AS total FROM SalesLT.Product
 GROUP BY ProductCategoryID
 ORDER BY total DESC
 

 --INNER JOIN

 SELECT * FROM SalesLT.Product p
 INNER JOIN SalesLT.ProductCategory pc
	on p.ProductCategoryID = pc.ProductCategoryID


 --INNER JOIN

 SELECT 
	soh.CustomerID as sales_order_id,
	c.FirstName as customer_first_name

 FROM SalesLT.SalesOrderHeader soh
 INNER JOIN SalesLT.Customer c
	on c.CustomerID = soh.CustomerID



-- Practica (variables, alias, columnas

-- 1. total de clientes
	
	select count(*) as total_clientes from SalesLT.Customer
	order by total_clientes


-- 2. total de ventas en el mes de octubre
	
	select sum(TotalDue) as total_junio from SalesLT.SalesOrderHeader
	where MONTH (OrderDate) = 6

-- 3. ordenar las categorias por nombre

	select Name as Categoria from SalesLT.ProductCategory pc
	group by pc.Name
	order by pc.name ASC

-- 4. que relaciones cabecera y detalle factura

	SELECT 
		soh.SalesOrderID as sales_order_id,
		soh.OrderDate,
		sod.ProductID,
		sod.OrderQty

	FROM SalesLT.SalesOrderHeader soh
	INNER JOIN SalesLT.SalesOrderDetail sod
		on sod.SalesOrderID = soh.SalesOrderID	

	

		select * from SalesLT.SalesOrderDetail
		select * from SalesLT.SalesOrderHeader


-- 5. implementacion paginacion

	DECLARE @PAGE_NUMBER INT = 1;
	DECLARE @ROWS_PER_PAGE INT = 5;

	SELECT ProductID, Name, ListPrice	
	FROM SalesLT.Product
	ORDER BY ProductID
	OFFSET (@PAGE_NUMBER - 1) * @ROWS_PER_PAGE ROWS
	FETCH NEXT @ROWS_PER_PAGE ROWS ONLY;



-- 6. uso de distinct y top

  DECLARE @PAGE_NUMBER INT =1;
  DECLARE @ROWS_PER_PAGE INT = 10;
	
  SELECT distinct top(5) Color as product_color from SalesLT.Product 
  where Color is not null
  order by Color



  -- select * from SalesLT.Product

