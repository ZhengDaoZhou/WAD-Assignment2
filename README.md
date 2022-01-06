# Assignment 2 - Web API.

Name: ZhengDao Zhou

## Features.

 
 + Feature 1 - The upcoming movies API becomes parameterised
 + Feature 2 - The top-rated and popular movies API are added, and they all have a page parameter 
 + Feature 3 - The React APP now using this API's user data for authentication
 + Feature 4 - Some routes in the React APP are protected now


## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://ZhengDao:*****@wadasp.4mqfy.mongodb.net/WADASP?retryWrites=true&w=majority
SEED_DB=True
SECRET=****
TMDB_KEY=****
HEROKU_API_KEY=****
HEROKU_APP_NAME_STAGING=asp-assignment-2-zzd
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies//tmdb/upcoming/{page} | Get certain page of a list of upcoming movies| N/A | N/A | N/A  
| /api/movies//tmdb/topRated/{page} | Get certain page of a list of top-rated movies| N/A | N/A | N/A  
| /api/movies//tmdb/popular/{page} | Get certain page of a list of popular movies| N/A | N/A | N/A  
| /api/genres | Get a list of genres| N/A | N/A | N/A 
| /api/user | Get all users| Authenticate a user or register a user | Update a user | N/A 
| /api/user/{userName}/favourites | Get a users' favourites| Add a movie to a user's favourite | N/A | N/A 



## Security and Authentication
The original React App was using the user data of TMDB but now it authenticates users by data in local (or cloud) MongoDB. Only logged user can access the top-rated page and popular page. Also, once the user logged in, the login button will become logout button and can be used for signing out.

## Integrating with React App
Change of React App

~~~Javascript
export const getTopRatedMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `/api/movies/tmdb/topRated/${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

~~~

Change of Web API
~~~Javascript
export const getTopRatedMovies = (args) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=${args}`
    ).then((response) => {
        if (!response.ok) {
        throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
};
~~~
## Extra features

The content of site header will change according to the logged user.

## Independent learning

When dealing with the integration of API authentication and React App, something always gone wrong no matter how I corrected the code. After long time of debuging I found that it was the problem causing by asynchronization. So I learnt something like combing the setTimeout with promise or async/await to create some delay in a more elegant way. 

# Assignment 2 - Agile Software Practice.

Name: ZhengDao Zhou
## Target Web API.


|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies//tmdb/upcoming/{page} | Get certain page of a list of upcoming movies| N/A | N/A | N/A  
| /api/movies//tmdb/topRated/{page} | Get certain page of a list of top-rated movies| N/A | N/A | N/A  
| /api/movies//tmdb/popular/{page} | Get certain page of a list of popular movies| N/A | N/A | N/A  
| /api/user | Get all users| Authenticate a user or register a user | Update a user | N/A 
## Error/Exception Testing.


+ Post /movie/:id/reviews - test when the post request has no review. Test sending a request without reviews. See tests/functional/api/movie/index.js 
~~~Javascript
 it("should alert when there is no review input", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .set("author","Kenny")

      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 401,
          msg: 'Please enter the reviews'
      });
    })
  });
~~~

## Continuous Delivery/Deployment.



+ https://dashboard.heroku.com/apps/asp-assignment-2-zzd - Staging deployment
+ https://gitlab.com/Milliliter/asp-assignment-2 - Continuous Delivery


+ Staging app overview 
![Staging](./image/SD.jpg)
+ Continous Delivery overview 
![Staging](./image/CICD.jpg)