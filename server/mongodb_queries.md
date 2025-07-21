# MongoDB Queries for Compass

## 1. Find All Movies with Their Ratings (Sorted by Rating)
```javascript
// Collection: movies
// Sort movies by rating in descending order
{}
```
**Sort by:** `rating` (Descending)

## 2. Find Movies from a Specific Year
```javascript
// Collection: movies
// Find movies from 1999
{
  "year": 1999
}
```

## 3. Find Movies with Rating Above 8.0
```javascript
// Collection: movies
// Find highly rated movies
{
  "rating": {
    "$gt": 8.0
  }
}
```

## 4. Find All Actors
```javascript
// Collection: actors
// Get all actors
{}
```

## 5. Find Actors by Nationality
```javascript
// Collection: actors
// Find American actors
{
  "nationality": "American"
}
```

## 6. Find Movies by Genre (Using Genre Name)
```javascript
// Collection: movies
// First, get the Action genre ID from genres collection
// Then use this query in movies collection
{
  "genres": {
    "$elemMatch": {
      "$oid": "687a6b110349fc17cdc28ea9"
    }
  }
}
```

## 7. Find Movies by Actor (Using Actor Name)
```javascript
// Collection: movies
// First, get the actor ID from actors collection
// Then use this query in movies collection
{
  "actors": {
    "$elemMatch": {
      "$oid": "687a6a7b0349fc17cdc28ea7"
    }
  }
}
```

## 8. Find Movies with Multiple Genres
```javascript
// Collection: movies
// Find movies that have more than one genre
{
  "genres": {
    "$size": {
      "$gt": 1
    }
  }
}
```

## 9. Find Movies by Director
```javascript
// Collection: movies
// Find movies by James Cameron
{
  "director": "James Cameron"
}
```

## 10. Find Movies from 2000s with High Rating
```javascript
// Collection: movies
// Find movies from 2000s with rating above 8.0
{
  "$and": [
    {
      "year": {
        "$gte": 2000
      }
    },
    {
      "year": {
        "$lt": 2010
      }
    },
    {
      "rating": {
        "$gt": 8.0
      }
    }
  ]
}
```

## 11. Find All Genres
```javascript
// Collection: genres
// Get all genres
{}
```

## 12. Find Movies by Year Range
```javascript
// Collection: movies
// Find movies from 1995 to 2005
{
  "year": {
    "$gte": 1995,
    "$lte": 2005
  }
}
```

## 13. Find Actors by Birth Year Range
```javascript
// Collection: actors
// Find actors born in the 1960s
{
  "birthYear": {
    "$gte": 1960,
    "$lte": 1969
  }
}
```

## 14. Find Movies with Specific Actor and Genre Combination
```javascript
// Collection: movies
// Find action movies starring Brad Pitt
{
  "$and": [
    {
      "actors": {
        "$elemMatch": {
          "$oid": "687a6a7b0349fc17cdc28ea9"
        }
      }
    },
    {
      "genres": {
        "$elemMatch": {
          "$oid": "687a6b110349fc17cdc28ea9"
        }
      }
    }
  ]
}
```

## 15. Find Movies by Title Pattern
```javascript
// Collection: movies
// Find movies with "The" in the title
{
  "title": {
    "$regex": "The",
    "$options": "i"
  }
}
```

## Reference IDs for Queries:

### Actor IDs:
- Tom Hanks: `687a6a7b0349fc17cdc28ea7`
- Scarlett Johansson: `687a6a7b0349fc17cdc28ea8`
- Brad Pitt: `687a6a7b0349fc17cdc28ea9`
- Charlize Theron: `687a6a7b0349fc17cdc28eaa`
- Ryan Reynolds: `687a6a7b0349fc17cdc28eab`

### Genre IDs:
- Action: `687a6b110349fc17cdc28ea9`
- Drama: `687a6b110349fc17cdc28eaa`
- Comedy: `687a6b110349fc17cdc28eab`
- Science Fiction: `687a6b110349fc17cdc28eac`
- Horror: `687a6b110349fc17cdc28ead`
- Romance: `687a6b110349fc17cdc28eae`
- Thriller: `687a6b110349fc17cdc28eaf`
- Fantasy: `687a6b110349fc17cdc28eb0`
- Documentary: `687a6b110349fc17cdc28eb1`
- Animation: `687a6b110349fc17cdc28eb2` 