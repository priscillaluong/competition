from flask import Flask, render_template, request, redirect
app = Flask("MyApp")

@app.route("/")
def welcome(): 
	return render_template("index.html") 

@app.route("/signup", methods=["POST"])
def suscribe():
	print request.form["email"]
	if request.form["email"]:
		email = request.form["email"]
		return "ok"
	else:
		return render_template("index.html", name=none)

app.run(debug=True)