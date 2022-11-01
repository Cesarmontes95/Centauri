from flask import Flask, render_template, request, redirect, url_for, session, flash, send_from_directory
from flaskext.mysql import MySQL
from datetime import datetime, timedelta
import os

app = Flask(__name__)
app.secret_key = "arhCE7nG$BU1-AyY*bewz@QVxHi&svW/fRg6p920S?j#FN8P5t"
app.permanent_session_lifetime = timedelta(days=7)

mysql = MySQL()
app.config['MYSQL_DATABASE_HOST']= 'localhost'
app.config['MYSQL_DATABASE_USER']= 'root'
app.config['MYSQL_DATABASE_PASSWORD']= 'mysql'
app.config['MYSQL_DATABASE_DB']= 'centauri'
mysql.init_app(app)

CARPETA = os.path.join('static/img/')
app.config['CARPETA'] = CARPETA

@app.route('/')
def index():
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.route('/img/<imagen>')
def img(imagen):
    return send_from_directory(app.config['CARPETA'], imagen)


@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/select', methods=['POST'])
def select():
    
    if request.method == 'POST':
        Correo = request.form['Correo']
        Password = request.form['Password']
        Nombre = request.form['Nombre']
        
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE Correo = %s AND Pass = %s AND Nombre = %s", (Correo, Password, Nombre))
    record = cursor.fetchone()
    if record:
        session.permanent = True
        session['loggedin'] = True
        session['Correo'] = record[1]
        session['Nombre'] = record[3]
        return redirect(url_for('inicio'))
    else:

        flash("Correo o contraseña incorrecta!")
        return render_template('login.html')

@app.route('/inicio')
def inicio():
    
    if session.get('Correo') is not None:
    # Cuando hay usuario
        return render_template('inicio.html', Correo = session['Correo'], Nombre = session['Nombre'])
    else:
    # Cuando no hay usuario
        return render_template("index.html")


@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('Correo', None)
    return redirect(url_for('login'))

#Noticias

@app.route('/news/<int:id>/<titulo>')
def news(id, titulo):

    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT n.id , n.titulo, n.descripcion, n.foto1, n.foto2, n.foto3, n.foto4, c.tipo FROM noticias AS n INNER JOIN categoria AS c ON n.tipo=c.id WHERE n.id = %s AND n.titulo = %s", (id, titulo))

    news=cursor.fetchall()
    print(news)

    conn.commit()

    if session.get('Correo') is not None:
        return render_template('news.html', news=news, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")

@app.route('/noticias')
def noticias(): 
    sql="SELECT n.id , n.titulo, n.foto1, n.foto2, n.foto3, n.foto4, c.tipo FROM noticias AS n INNER JOIN categoria AS c ON n.tipo=c.id;"
    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)
    
    news=cursor.fetchall()
    print(news)
    conn.commit()

    if session.get('Correo') is not None:
        return render_template('noticias.html', news=news, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")



@app.route("/data_news")
def data_news():
    return render_template('dato_noticias.html')


@app.route('/datos_noticias', methods=['POST'])
def datos_noticias():

    _foto1 = request.files['foto1']
    _foto2 = request.files['foto2']
    _foto3 = request.files['foto3']
    _foto4 = request.files['foto4']

    now = datetime.now()
    tiempo=now.strftime('%Y%H%M%S')

    if _foto1.filename!='':
        NewNamePhoto1=tiempo+_foto1.filename
        _foto1.save('assets/static/img/'+NewNamePhoto1)
    
    if _foto2.filename!='':
        NewNamePhoto2=tiempo+_foto2.filename
        _foto2.save('assets/static/img/'+NewNamePhoto2)

    if _foto3.filename!='':
        NewNamePhoto3=tiempo+_foto3.filename
        _foto3.save('assets/static/img/'+NewNamePhoto3)

    if _foto4.filename!='':
        NewNamePhoto4=tiempo+_foto4.filename
        _foto4.save('assets/static/img/'+NewNamePhoto4)

    _titulo = request.form['titulo']
    _descripcion = request.form['descripcion']
    _tipo = request.form['tipo']


    if _titulo == '' or _descripcion == '' or _tipo == '':
        flash('Recuerda completar todos los campos')
        return redirect(url_for('datos_wiki'))
    
    
    sql = "INSERT INTO noticias (titulo, descripcion, foto1, foto2, foto3, foto4, tipo) VALUES (%s, %s, %s, %s, %s, %s, %s);"
    
    datos = (_titulo, _descripcion, NewNamePhoto1, NewNamePhoto2, NewNamePhoto3, NewNamePhoto4, _tipo)
    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()

    return redirect(url_for('data_news'))

#Noticias


#Intereses

@app.route('/interes/<int:id>/<correo>')
def interes(id, correo):

    sql = "INSERT INTO intereses (interes ,usuario) VALUES (%s, %s)"
    
    datos = (id, correo)
    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()

    return redirect(request.referrer)

    
@app.route('/delete/<int:id>')
def delete(id):

    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute("DELETE FROM intereses WHERE interes = %s", (id))
    conn.commit()

    return redirect(request.referrer)

@app.route('/intr/<Correo>')
def intr(Correo):
    sql="SELECT i.id ,i.interes, w.foto ,w.nombre, c.tipo, COUNT(w.nombre) AS nombre2 FROM intereses AS i INNER JOIN wiki AS w ON i.interes=w.id INNER JOIN categoria AS c ON w.tipo=c.id WHERE usuario = %s GROUP BY w.nombre;"
    datos = (Correo)
    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql, datos)
    
    datos=cursor.fetchall()
    print(datos)

    conn.commit()

    if session.get('Correo') is not None:
            return render_template('interes.html', datos=datos, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")


#Intereses


#Categoria

@app.route('/tipo/<categoria>')
def tipo(categoria):

    
    sql = "SELECT w.id, w.foto ,w.nombre, c.tipo FROM wiki AS w INNER JOIN categoria AS c ON w.tipo=c.id WHERE c.tipo = %s ;"
    
    datos = (categoria )
    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute(sql,datos)

    datos=cursor.fetchall()

    sql="SELECT * FROM categoria;"
    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)
   
    tipos=cursor.fetchall()

    print(datos, tipos)

    conn.commit()

    if session.get('Correo') is not None:
        return render_template('categoria.html', datos=datos, tipos=tipos, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")
    

#Categoria


#Wiki

@app.route('/wikic/<int:id>/<nombre>')
def wikic(id, nombre):

    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT w.id, w.foto, w.nombre, c.tipo, w.size, w.temperatura, w.descripcion FROM wiki AS w INNER JOIN categoria AS c ON w.tipo=c.id WHERE w.id = %s AND w.nombre = %s", (id, nombre))

    informacion=cursor.fetchall()
    print(informacion)

    conn.commit()

    if session.get('Correo') is not None:
        return render_template('WikiC.html',informacion=informacion, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")
    
    

@app.route('/wiki')
def wiki(): 
    sql="SELECT w.id, w.foto ,w.nombre, c.tipo FROM wiki AS w INNER JOIN categoria AS c ON w.tipo=c.id; "
    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)
    
    datos=cursor.fetchall()

    sql="SELECT * FROM categoria;"
    conn= mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)
   
    tipos=cursor.fetchall()

    conn.commit()

    print(datos, tipos)

    conn.commit()

    if session.get('Correo') is not None:
        return render_template('wiki.html', datos=datos, tipos=tipos, Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")



@app.route("/datos_wiki")
def datos_wiki():
    return render_template('datos.html')


@app.route('/datos', methods=['POST'])
def datos():

    _foto = request.files['foto']

    now = datetime.now()
    tiempo=now.strftime('%Y%H%M%S')

    if _foto.filename!='':
        NewNamePhoto=tiempo+_foto.filename
        _foto.save('assets/static/img/'+NewNamePhoto)

    _nombre = request.form['nombre']
    _tipo = request.form['tipo']
    _size = request.form['size']
    _temperatura = request.form['temperatura']
    _descripcion = request.form['descripcion']


    if _foto == '' or _nombre == '' or _tipo =='' or _size == '' or _temperatura == '' or _descripcion == '':
        flash('Recuerda completar todos los campos')
        return redirect(url_for('datos_wiki'))
    
    
    sql = "INSERT INTO wiki (foto, nombre, tipo, size, temperatura, descripcion) VALUES (%s, %s, %s, %s, %s, %s);"
    
    datos = (NewNamePhoto, _nombre, _tipo, _size, _temperatura, _descripcion)
    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()

    return redirect(url_for('datos_wiki'))

#Wiki


@app.route('/quizz')
def quizz():

    if session.get('Correo') is not None:
        return render_template('quizz.html', Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")


@app.route("/solar")
def solar():
    if session.get('Correo') is not None:
        return render_template('solar.html', Correo = session['Correo'], Nombre = session['Nombre'])
    else:
        return render_template("index.html")


@app.route('/planetas')
def planetas():
    return render_template("planetas.html")
    
    
@app.route('/registro')
def registro():
    return render_template("registro.html")


@app.route('/store', methods=['POST'])
def store():
    
    _Correo = request.form['Correo']
    _Password = request.form['Password']
    _Nombre = request.form['Nombre']
    
    if _Correo == '' or _Password =='' or _Nombre == '':
        flash('Recuerda completar todos los campos')
        return redirect(url_for('registro'))
    
    sql = "INSERT INTO users(Correo, Pass, Nombre) VALUES (%s,%s,%s);"
    
    datos = (_Correo, _Password, _Nombre)
    conn = mysql.connect()
    cursor= conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()
    return redirect(url_for('login'))

    
if __name__ == '__main__':
    app.run(debug=True)