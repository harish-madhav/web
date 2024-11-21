python -m http.server

<xsl:output method="text" omit-xml-declaration="no"/>



xsl schema


<?xml version="1.0" encoding="utf-8"?>
<employees xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:noNamespaceSchemaLocation="employees.xsd">
    <employee id="be129">
        <firstname>Jitendra</firstname>
        <lastname>Kumar</lastname>
        <title>Engineer</title>
        <division>Materials</division>
        <building>327</building>
        <room>19</room>
    </employee>
    <employee id="be130">
        <firstname>Amit</firstname>
        <lastname>Kumar</lastname>
        <title>Accountant</title>
        <division>Accts Payable</division>
        <building>326</building>
        <room>14</room>
    </employee>
    <employee id="be131">
        <firstname>Akash</firstname>
        <lastname>Kumar</lastname>
        <title>Engineering Manager</title>
        <division>Materials</division>
        <building>327</building>
        <room>21</room>
    </employee>
    <employee id="be132">
        <firstname>Aishwarya</firstname>
        <lastname>Kulshrestha</lastname>
        <title>Engineer</title>
        <division>Materials</division>
        <building>327</building>
        <room>22</room>
    </employee>
    <employee id="be133">
        <firstname>Sachin</firstname>
        <lastname>Kumar</lastname>
        <title>Engineer</title>
        <division>Materials</division>
        <building>327</building>
        <room>24</room>
    </employee>
    <employee id="be135">
        <firstname>Vikash</firstname>
        <lastname>Kumar</lastname>
        <title>COO</title>
        <division>Management</division>
        <building>216</



<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Root element 'employees' -->
  <xs:element name="employees">
    <xs:complexType>
      <xs:sequence>
        <!-- Defining multiple employee elements -->
        <xs:element name="employee" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="firstname" type="xs:string"/>
              <xs:element name="lastname" type="xs:string"/>
              <xs:element name="title" type="xs:string"/>
              <xs:element name="division" type="xs:string"/>
              <xs:element name="building" type="xs:int"/>
              <xs:element name="room" type="xs:int"/>
            </xs:sequence>
            <!-- Defining an attribute 'id' for employee -->
            <xs:attribute name="id" type="xs:string" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>




DTD


<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE web SYSTEM "books.dtd">
<web>
  <books>
    <title>WEb Services</title>
    <author>Bob Dylan</author>
    <country>USA</country>
    <company>Columbia</company>
    <price>10.90</price>
    <year>1985</year>
  </books>
  <books>
    <title>XML and Web</title>
    <author>Williams</author>
    <country>UK</country>
    <company>CBS Records</company>
    <price>9.90</price>
    <year>1988</year>
  </books>
  <books>
    <title>Javascript</title>
    <author>Christopher</author>
    <country>USA</country>
    <company>RCA</company>
    <price>9.90</price>
    <year>1982</year>
  </books>
</web>



<!ELEMENT web (books+)>
<!ELEMENT books (title, author, country, company, price, year)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT country (#PCDATA)>
<!ELEMENT company (#PCDATA)>
<!ELEMENT price (#PCDATA)>
<!ELEMENT year (#PCDATA)>




XQuery



web.xq


xquery version "1.0";

declare namespace html = "http://www.w3.org/1999/xhtml";

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Books Information</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h2>Books Information</h2>
    <table>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Country</th>
        <th>Company</th>
        <th>Price</th>
        <th>Year</th>
      </tr>
      {
        for $book in doc("web.xml")/web/books
        return
          <tr>
            <td>{ $book/title/text() }</td>
            <td>{ $book/author/text() }</td>
            <td>{ $book/country/text() }</td>
            <td>{ $book/company/text() }</td>
            <td>{ $book/price/text() }</td>
            <td>{ $book/year/text() }</td>
          </tr>
      }
    </table>
  </body>
</html>



