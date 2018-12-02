# Django Channels Tutorial Series

[![alt text](https://github.com/justdjango/justchat/blob/master/thumbnail.png "Logo")](https://youtu.be/uZgRbnIsgrA)

This tutorial is for how to build a chat application with Django Channels. The tutorial series can be watched [here](https://youtu.be/Wv5jlmJs2sU)

To run the frontend, run:

```json
virtualenv env
source env/bin/activate
cd src
pip install -r requirements.txt
python manage.py runserver
```

To run the backend:

```json
cd frontend
npm i
npm start
```

To build for deployment:

```json
npm run build
```

Please note this is a **demo project** of the concepts used in building a chat app. It is simply not production ready. The project is setup for deployment on Heroku however you'll need to follow tutorials on how to get this [up and running](https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django)
