from flask import Flask, render_template,redirect,request,g, session
from flask_mysqldb import MySQL
import requests

# Replace 'YOUR_API_KEY' with your actual OMDb API key
api_key = 'a5deaf36'

app = Flask(__name__)

def flatten_dict(d, parent_key='', sep='_'):
    """
    Flattens a nested dictionary into a flat, single-level dictionary.

    :param d: The input dictionary.
    :param parent_key: Used for recursive calls to keep track of parent keys.
    :param sep: Separator character to combine keys.
    :return: A flat dictionary.
    """
    items = {}
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_dict(v, new_key, sep=sep))
        else:
            items[new_key] = v
    return items





def get_movie_details(movie_title):

    omdb_url = f"http://www.omdbapi.com/?t={movie_title}&apikey={api_key}"
    response = requests.get(omdb_url)
    omdb_data = response.json()
    Id=omdb_data['imdbID']
    # Director=data['Director']
    # writer=data['Writer']
    # Actors=data['Actors']

    ott_url = "https://ott-details.p.rapidapi.com/gettitleDetails"

    querystring = {"imdbid":Id}

    headers = {
        "X-RapidAPI-Key": "1952d338eamsh305c58d6b597f6fp164f8cjsna76003abad00",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com"
    }


    response = requests.get(ott_url, headers=headers, params=querystring)
    data=response.json()
    ott_data=flatten_dict(data) 
    if 'streamingAvailability_country_US' in ott_data or 'streamingAvailability_country_IN' in ott_data:

        if 'streamingAvailability_country_US' in ott_data and 'streamingAvailability_country_IN' in ott_data:
            countries = ['streamingAvailability_country_IN','streamingAvailability_country_US']
        elif 'streamingAvailability_country_IN' in ott_data:
            countries=['streamingAvailability_country_IN']
        else:
            countries = ['streamingAvailability_country_US']
        if countries:
            for country in countries:

                for key in ott_data[country]:

                    if key['platform']=="netflix":
                        key['img']="static\images\netflix.png"
                    elif key['platform']=="disneyplus":
                        key['img']="static\images\disney.png"
                    elif key['platform']=="play":
                        key['img']="static\images\google play.png"
                    elif key['platform']=="youtube":
                        key['img']="static\images\youtube.png"
                    elif key['platform']=="amazonprimevideo" or key['platform']=="amazonprime" or key['platform']=="amazon":
                        key['img']="static\images\Amazon_Prime_Video.webp"
                    elif key['platform']=="sonyliv":
                        key['img']="static\images\sony liv.jpeg"
                    elif key['platform']=="hotstar":
                        key['img']="static\images\hotstar.png"
                    elif key['platform']=="voot":
                        key['img']="static\images\VOOT.png"
                    elif key['platform']=="itunes":
                        key['img']="static\images\itunes.jpg"
                    elif key['platform']=="directv":
                        key['img']="static\images\directtv.png"
                    elif key['platform']=="tatasky":
                        key['img']="static\images\tatasky.png"
                    elif key['platform']=="crunchyroll":
                        key['img']="static\images\crunchyroll.png"
    return ott_data,omdb_data




app.secret_key = 'your_secret_key_here'

# Replace 'YOUR_API_KEY' with your actual OMDb API key
api_key = 'a5deaf36'
#connecting to the database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'vijju9603'
app.config['MYSQL_DB'] = 'findingthemovies'

mysql = MySQL(app)

# Dummy user data for demonstration (you should replace this with a proper user database)
users = [
    {"username": "user1", "password": "pass1"},
    {"username": "user2", "password": "pass2"},
    # Add more users as needed
]

def is_authenticated():
    return 'username' in session

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cur = mysql.connection.cursor()
        user = cur.execute("SELECT * FROM USERS WHERE username = %s AND password = %s", (username, password))

        if user:
            # Store the username in the session to track the authenticated user
            session['username'] = username
            return redirect('/find')  # Redirect to the /find route on successful login
        else:
            return 'Invalid username or password'

    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        Name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        cur = mysql.connection.cursor()
        if username and Name and email and password:
            user = cur.execute("SELECT * FROM USERS where username= %s or email_id= %s", (username, email))
            if user:
                return 'Username or email already exists!'
            else:
                cur.execute("INSERT INTO USERS (username, name, email_id, password) VALUES (%s, %s, %s, %s)",
                            (username, Name, email, password))
                mysql.connection.commit()
            cur.close()

            return 'Registered successfully'
        else:
            return 'Please fill all the fields'
    return render_template('index.html')

@app.route('/find', methods=['GET', 'POST'])
def find():
    if not is_authenticated():
        return redirect('/')
    
    global data_1
    global data_2
    if request.method == 'POST':
        search_query = request.form['search']
        if search_query:
            data_1, data_2 = get_movie_details(search_query)
            return render_template('movie.html', ott_data=data_1, movie_data=data_2)

    return render_template('search.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/login')
def login():
    return render_template('index.html')


@app.route('/insert_movie_data/<movie_title>/<imdb_id>', methods=['GET'])
def insert_movie_data(movie_title, imdb_id):
    if is_authenticated():
        user_id = session['user_id']  # Assuming you store the user's ID in the session

        # Insert the movie details into the database (e.g., liked_movies table)
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO user_movie_likes (user_id, movie_title, imdb_id) VALUES (%s, %s, %s)",
            (user_id, data_1['title'], imdb_id)
        )
        mysql.connection.commit()
        cur.close()

        # Return a response indicating successful insertion
        return "Movie data inserted into the database!", 200
    else:
        return "You need to be logged in to insert movie data.", 401

if __name__ == '__main__':
    app.run(debug=True)