<?xml version="1.0" encoding="utf-8"?>
<!-- XSL designed for XML essays -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">  
<html>
    <head>
        <script type="text/javascript"
            src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
        </script>     
        <script type="text/javascript">
            function extension(id,type,auto) {
                if (id=='') return;
                var obj=document.getElementById(id+".counter");
                if (auto) { 
                    obj.value=parseInt(obj.value)+1;
                    document.getElementById(id + '.' + type + '.BA.p').title="свернуть расширение (блокировано)";
                    document.getElementById(id + '.' + type + '.B.p').title="свернуть расширение (блокировано)";
                }
                i=id + '.' + type;
                obj=document.getElementById(i);
                if (document.getElementById(id).style.display=='block') {
                    document.getElementById(id).style.display = 'none';
                    if (auto) {
                        i = id + '.' + type + '.BA';
                    } 
                    else {
                        i = id + '.' + type + '.B';
                    }
                    obj.style.display = 'block';
                    obj=document.getElementById(i);
                    obj.style.display = 'block';
                } 
            }
        </script>
        <script type="text/javascript">
            function question(id,n) {
                var q=Math.floor(Math.random()*n)+1;
                document.getElementById(id).style.display = 'none';
                var i=id + '.Q' +  q.toString();
                document.getElementById(i).style.display = 'block';
                document.getElementById(i+'.X').click();
                document.getElementById(i+'.A').style.display = 'none';
                document.getElementById(i+'.CA').style.display = 'none';
                document.getElementById(i+'.E').style.display = 'none';
            }
        </script>
        <script type="text/javascript">
            function answer(id,sel,correct) {
                var i, i1;
                document.getElementById(id+'.E').style.display = 'none';
                if (sel.selectedIndex==correct)
                    {i=id + '.CA'; i1=id + '.A'}
                else
                    {i=id + '.A'; i1=id + '.CA'};
                document.getElementById(i).style.display = 'block';
                document.getElementById(i1).style.display = 'none';
                sel.selectedIndex=0;
            }
        </script>
        <script type="text/javascript">
            function clickXbelow(obj) {
                var but=obj.getElementsByTagName('button')[0];
                if (null != but) but.click();
                var elems = obj.getElementsByTagName('div');
                if (elems.length!=0)
                    for (var k=elems.length-1;k!=0;k--) {clickXbelow(elems[k])};
            }
            function back(id,linkid,linktype) {
                var pos = id.lastIndexOf(".");
                var i = id.slice(0, pos);
                var obj=document.getElementById(i+".counter");
                if (parseInt(obj.value)!=0) return;
                var obj=document.getElementById(i);
                obj.style.display = 'block';
                obj = document.getElementById(id);             
                if (obj.style.display == 'none') return;
                obj.style.display = 'none';
                var elems = obj.getElementsByTagName('div');
                if (elems.length!=0)
                    for (var k=elems.length-1;k!=0;k--) {clickXbelow(elems[k])};
                i = id + '.B';
                obj=document.getElementById(i);
                if (null != obj) {
                    obj.style.display = 'none'
                };
                i = id + '.BA';
                obj=document.getElementById(i);
                if (null != obj) {
                    obj.style.display = 'none'
                };
                if (linkid!='') {
                    obj = document.getElementById(linkid+".counter");
                    obj.value=parseInt(obj.value)-1;
                    if (obj.value==0) {
                        document.getElementById(linkid + '.' + linktype + '.BA.p').title="свернуть расширение";
                        document.getElementById(linkid + '.' + linktype + '.B.p').title="свернуть расширение";
                    }
                }
            }
        </script>
        <script type="text/javascript">
            function explain(id) {
                document.getElementById(id+'.A').style.display = 'none';
                document.getElementById(id+'.CA').style.display = 'none';
                var i=id + '.E';
                document.getElementById(i).style.display = 'block';
            }
        </script>
        <script type="text/javascript">
            function findTop(id) {
                var obj=document.getElementById(id);
                var curtop = 0;

                while(obj) {
                    curtop = curtop + parseFloat(obj.offsetTop);
                    obj = obj.offsetParent;
                }
                return curtop;
            }
        </script>

        <title>
            <xsl:value-of select="Essay/Title" />(расширяемое эссе)
        </title>
    </head>
    
    <body>
        <center>
            <h1>
                <xsl:value-of select="Essay/Title" /><br /><small> </small>
            </h1>
        </center>
        <center>
            <h1>
                <small>
                    <xsl:value-of select="Essay/Author" />
                </small>
            </h1>
        </center>
        <xsl:apply-templates select="Essay/Parts/Part" />
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
        </script>
    </body>
</html>
</xsl:template>

<xsl:template match="Part">  
    <h2>
        <xsl:value-of select="Number" />
    </h2>    
<!-- Абзацы -->
    <xsl:apply-templates select="Paragraph" />
    <xsl:if test="count(Tasks/Task) &gt; 0">
<!-- Раздел T -->
        <div id='{generate-id(Tasks)}'  style="display: block">
           <input id='{generate-id(Tasks)}.counter' type="hidden" value="0" />
           <table width="100%" border="0" cellpadding="5" cellspacing="0">
                <tr>
                    <!-- команды  -->
                    <td width="40" valign="top" bgcolor="#f0f0f0">
                        <table width="100%" cellpadding="2" cellspacing="1">
                            <tr>
                                <td align="center" bgcolor="#ffffff">
                                    <p style="cursor:pointer;" title="тест" onClick="question('{generate-id(Tasks)}',{count(Tasks/Task)})">
                                        <font color="#CC0000"> T </font> 
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td valign="top" bgcolor="#ffffff">
                        <div><!----></div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Вопросы  -->       
        <xsl:apply-templates select="Tasks/Task" />
    </xsl:if>
</xsl:template>

<xsl:template match="Paragraph">
        <div id='{generate-id(.)}'  style="display: block">
           <input id='{generate-id(.)}.counter' type="hidden" value="0" />
           <table width="100%" border="0" cellpadding="5" cellspacing="0">
                <tr>
                    <xsl:if test="(..=/Essay/Parts/Part) or (count(../Paragraph/Extension) &gt; 0)">
                        <!-- команды  -->                    
                        <td width="40" valign="top" bgcolor="#f0f0f0">
                            <table width="100%" cellpadding="2" cellspacing="1">
                                <tr>
                                    <xsl:if test="count(Extension)=1">
                                        <xsl:variable name="link" select="Extension[1]/@linked" />
                                        <xsl:variable name="link2" select="//Paragraph[@label=$link]/Extension[1]/@linked" />
                                        <xsl:variable name="prompt">
                                            <xsl:if test="Extension[1]/@type='More'">подробнее</xsl:if>
                                            <xsl:if test="Extension[1]/@type='Example'">добавить пример</xsl:if>
                                            <xsl:if test="Extension[1]/@type='Cite'">литература</xsl:if>
                                        </xsl:variable>
                                        <td align="center" bgcolor="#ffffff">
                                            <p style="cursor:pointer;" title="{$prompt}" onClick="extension('{generate-id(.)}','{Extension[1]/@type}',false);var t=findTop('{generate-id(.)}.{Extension[1]/@type}');extension('{generate-id(//Paragraph[@label=$link])}','{//Paragraph[@label=$link]/Extension[1]/@type}',true);window.scrollBy(0,findTop('{generate-id(.)}.{Extension[1]/@type}')-t);t=findTop('{generate-id(.)}.{Extension[1]/@type}');extension('{generate-id(//Paragraph[@label=$link2])}','{//Paragraph[@label=$link2]/Extension[1]/@type}',true);window.scrollBy(0,findTop('{generate-id(.)}.{Extension[1]/@type}')-t);">
                                                <font color="#CC0000">
                                                    <xsl:choose>
                                                        <xsl:when test="Extension/@type='More'">
                                                            +  
                                                        </xsl:when>
                                                        <xsl:when test="Extension/@type='Cite'">
                                                            [ ]  
                                                        </xsl:when>
                                                        <xsl:when test="Extension/@type='Example'">
                                                            :  
                                                        </xsl:when>                                                    
                                                    </xsl:choose>
                                                </font>
                                            </p>
                                        </td>
                                    </xsl:if>
                                    <xsl:if test="count(Extension)!=1">
                                        <td bgcolor="#f0f0f0">
                                        </td>
                                    </xsl:if>
                                </tr>
                            </table>
                        </td>
                    </xsl:if>  
                    <td valign="top" bgcolor="#ffffff">
                        <div>
                            <xsl:apply-templates select="Basic" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <xsl:apply-templates select="Extension" />
</xsl:template>

<xsl:template match="Extension">
        <div id='{generate-id(..)}.{@type}'  style="display: none">
           <xsl:variable name="link" select="@linked" />
           <button style="display: none" id="{generate-id(..)}.{@type}.X" onClick="back('{generate-id(..)}.{@type}','{generate-id(//Paragraph[@label=$link])}','{//Paragraph[@label=$link]/Extension[1]/@type}')">
           </button>
           <table width="100%" border="0" cellpadding="5" cellspacing="0">
                <tr>
                    <!-- команды  -->
                    <td width="40" valign="top" bgcolor="#f0f0f0">
                        <table width="100%" cellpadding="2" cellspacing="1">
                            <tr>
                                <td align="center" bgcolor="#ffffff">
                                    <div id='{generate-id(..)}.{@type}.B'  style="display: none">
                                        <p style="cursor:pointer;" id='{generate-id(..)}.{@type}.B.p' title="свернуть расширение" onClick="document.getElementById('{generate-id(..)}.{@type}.X').click()">
                                            <font color="#CC0000"> &#x2190; </font> 
                                        </p>
                                    </div>
                                    <div id='{generate-id(..)}.{@type}.BA'  style="display: none">
                                        <p style="cursor:pointer;" id='{generate-id(..)}.{@type}.BA.p' title="свернуть расширение" onClick="document.getElementById('{generate-id(..)}.{@type}.X').click()">
                                            <font color="#CC0000"> &#x21D0; </font> 
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td valign="top" bgcolor="#ffffff">
                        <xsl:apply-templates select="Paragraph" />
                    </td>
                </tr>
            </table>
        </div>
</xsl:template>

<xsl:template match="Basic">
    <P>
        <xsl:apply-templates />
    </P>
</xsl:template>

<xsl:template match="Task">
<xsl:variable name="lnk" select="./@linked" />

<!-- Вопрос-->
<div id="{generate-id(..)}.Q{position()}" style="display: none">
    <input id='{generate-id(..)}.Q{position()}.counter' type="hidden" value="0" />
    <button style="display: none" id="{generate-id(..)}.Q{position()}.X" onClick="var t=findTop(this.parentNode.id);extension('{generate-id(//Paragraph[@label=$lnk])}','{//Paragraph[@label=$lnk]/Extension[1]/@type}',true);window.scrollBy(0,findTop(this.parentNode.id)-t);">
    </button>
   <table width="100%" border="0" cellpadding="5" cellspacing="0">
       <tr>
            <!-- Навигация BACK -->
            <td width="40" valign="top" bgcolor="#f0f0f0">
                <table width="100%" cellpadding="2" cellspacing="1">
                    <tr>
                        <td align="center" bgcolor="#ffffff">
                            <p style="cursor:pointer;" title="свернуть расширение" onClick="back('{generate-id(..)}.Q{position()}','{generate-id(//Paragraph[@label=$lnk])}','{//Paragraph[@label=$lnk]/Extension[1]/@type}')">
                                <font color="#CC0000"> &#x2190; </font> 
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
            <!-- Абзацы самого вопроса -->
            <td valign="top" bgcolor="#ffffff">
                <!-- Текст вопроса -->
                <div id="{generate-id(..)}.Q{position()}.Q">
                    <i>Вопрос: </i><xsl:apply-templates select="Question" />
                    <!-- Варианты ответа -->
                    <ol>
                        <xsl:for-each select="Options/Option">
                            <li> 
                                <xsl:apply-templates select="self::node()" />
                            </li>
                        </xsl:for-each>
                    </ol>
                    <!-- Форма выбора ответа -->
                    <form name="{generate-id(..)}.Q{position()}.F">
                        <p><i>Выберите ответ: </i>
                            <select name="answers" size="1" onchange="answer('{generate-id(..)}.Q{position()}',this,{Answer})">
                                <option value="none"></option>
                                <xsl:for-each select="Options/Option">
                                    <option value="{position()}"><xsl:value-of select="position()" /></option>
                                </xsl:for-each>
                            </select>
                        </p>
                    </form>
                </div>
                
                <xsl:variable name="link" select="Comment[1]/@linked" />
                                            
                <!-- Подтверждение правильности ответа -->
                <div id="{generate-id(..)}.Q{position()}.CA" style="display: none">
                    <table width="100%" border="0" cellpadding="5" cellspacing="0">
                        <tr>
                            <td width="40" valign="top" bgcolor="#f0f0f0">
                                <table width="100%" cellpadding="2" cellspacing="1">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff">
                                            <p style="cursor:pointer;" onClick="explain('{generate-id(..)}.Q{position()}');var t=findTop('{generate-id(..)}.Q{position()}.E');extension('{generate-id(//Paragraph[@label=$link]/../..)}','{//Paragraph[@label=$link]/../../Extension[1]/@type}',true);window.scrollBy(0,findTop('{generate-id(..)}.Q{position()}.E')-t);t=findTop('{generate-id(..)}.Q{position()}.E');extension('{generate-id(//Paragraph[@label=$link])}','{//Paragraph[@label=$link]/Extension[1]/@type}',true);window.scrollBy(0,findTop('{generate-id(..)}.Q{position()}.E')-t);">
                                                <font color="#CC0000"> + </font>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" bgcolor="#ffffff">
                                <xsl:value-of select="Answer" /> - ответ правильный.
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- Информация о правильном ответе при неверном ответе -->
                <div id="{generate-id(..)}.Q{position()}.A" style="display: none">
                    <table width="100%" border="0" cellpadding="5" cellspacing="0">
                        <tr>
                            <td width="40" valign="top" bgcolor="#f0f0f0">
                                <table width="100%" cellpadding="2" cellspacing="1">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff">
                                            <p style="cursor:pointer;" onClick="explain('{generate-id(..)}.Q{position()}');var t=findTop('{generate-id(..)}.Q{position()}.E');extension('{generate-id(//Paragraph[@label=$link]/../..)}','{//Paragraph[@label=$link]/../../Extension[1]/@type}',true);extension('{generate-id(//Paragraph[@label=$link])}','{//Paragraph[@label=$link]/Extension[1]/@type}',true);window.scrollBy(0,findTop('{generate-id(..)}.Q{position()}.E')-t);">
                                                <font color="#CC0000"> + </font>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" bgcolor="#ffffff">
                                Правильный ответ - <xsl:value-of select="Answer" />.
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- пояснение к ответу -->
                <div id="{generate-id(..)}.Q{position()}.E" style="display: none">
                    <table width="100%" border="0" cellpadding="5" cellspacing="0">
                        <tr>
                            <td width="40" valign="top" bgcolor="#f0f0f0">
                                <table width="100%" cellpadding="2" cellspacing="1">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff">
                                            <p style="cursor:pointer;" title="свернуть расширение" onClick="back('{generate-id(..)}.Q{position()}.E','{generate-id(//Paragraph[@label=$link])}','{//Paragraph[@label=$link]/Extension[1]/@type}')">
                                                <font color="#CC0000"> &#x2190; </font>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" bgcolor="#ffffff">
                                <table width="100%" border="0" cellpadding="5" cellspacing="0">
                                    <tr>
                                        <td valign="top" bgcolor="#ffffff">
                                            Правильный ответ - <xsl:value-of select="Answer" />:<br/>
                                            <xsl:apply-templates select="Comment" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</div>
</xsl:template>

<xsl:template match="Question">
    <xsl:apply-templates />
</xsl:template>

<xsl:template match="Comment">
    <xsl:apply-templates />
</xsl:template>

<xsl:template match="Option">
    <xsl:apply-templates />
</xsl:template>

<xsl:template match="img">
    <img src="{@src}" HSPACE="0" BORDER="0" style="vertical-align: middle" />
</xsl:template>

<xsl:template match="font">
    <font size="{@size}">
        <xsl:apply-templates />
    </font>
</xsl:template>

<xsl:template match="indent">
    &#160;&#160;&#160;&#160;
</xsl:template>

<xsl:template match="space">
    &#160;
</xsl:template>

<xsl:template match="p">
    <p>
        <xsl:apply-templates />
    </p>
</xsl:template>

<xsl:template match="center">
    <p align="center">
        <xsl:apply-templates />
    </p>
</xsl:template>
<xsl:template match="left">
    <p align="left">
        <xsl:apply-templates />
    </p>
</xsl:template>
<xsl:template match="right">
    <p align="right">
        <xsl:apply-templates />
    </p>
</xsl:template>
<xsl:template match="justify">
    <p align="justify">
        <xsl:apply-templates />
    </p>
</xsl:template>


<xsl:template match="i">
    <i>
        <xsl:apply-templates />
    </i>
</xsl:template>
<xsl:template match="em">
    <i>
        <xsl:apply-templates />
    </i>
</xsl:template>
<xsl:template match="formula">
    <div>
        <xsl:apply-templates />
    </div>
</xsl:template>

<xsl:template match="b">
    <b>
        <xsl:apply-templates />
    </b>
</xsl:template>
<xsl:template match="u">
    <u>
        <xsl:apply-templates />
    </u>
</xsl:template>
<xsl:template match="strike">
    <strike>
        <xsl:apply-templates />
    </strike>
</xsl:template>
<xsl:template match="sup">
    <sup>
        <xsl:apply-templates />
    </sup>
</xsl:template>
<xsl:template match="sup">
    <sup>
        <xsl:apply-templates />
    </sup>
</xsl:template>
<xsl:template match="sub">
    <sub>
        <xsl:apply-templates />
    </sub>
</xsl:template>
<xsl:template match="sub">
    <sub>
        <xsl:apply-templates />
    </sub>
</xsl:template>
<xsl:template match="sub">
    <sub>
        <xsl:apply-templates />
    </sub>
</xsl:template>

  
</xsl:stylesheet>
