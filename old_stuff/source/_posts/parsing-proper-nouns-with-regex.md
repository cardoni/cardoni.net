title: "Parsing Proper Nouns"
tags:
    - regex
    - regular expression
    - parsing
    - proper nouns
    - noun parsing
    - word extraction
    - wordpos module
    - wordpos
categories:
 - regex
keywords: [ 'regex', 'parsing', 'proper nouns', 'word extraction', 'regular expression', 'wordpos' ]
date: 2015-02-28 14:10:05
---

Recently, I was working on a feature at [Hone](//gohone.com) that required—in part—parsing the *proper nouns* from the text within any given website. Here's an overview of how we accomplished this.

## First Attempt

At first, we thought it best to use something like the [*natural* module](//github.com/NaturalNode/natural) (or the part-of-speech utilities within—as found in the [*wordpos* module](//github.com/moos/wordpos)). And as it turns out, wordpos provides an easy, straight-forward API to parse text and returns an object with the sentence's parts-of-speech:

```javascript
    wordpos.getPOS( 'The angry bear chased the frightened little squirrel.', console.log );

    // Output:
    {
      nouns:        [ 'bear', 'squirrel', 'little', 'chased' ],
      verbs:        [ 'bear' ],
      adjectives:   [ 'little', 'angry', 'frightened' ],
      adverbs:      [ 'little' ],
      rest:         [ 'the' ]
    }
```

Wordpos also includes a handy *getNouns* method:

```javascript
    wordpos.getNouns( 'The angry bear chased the frightened little squirrel.', console.log );

    // Output:
    [ 'bear', 'squirrel', 'little', 'chased' ]
```

While it was clear that wordpos made it easy to extract *all* nouns, we desired something slightly different: **We wanted to capture *proper nouns* / *names***. In other words, the names of products, companies, people, devices, and so forth.

## So, we needed to:
1. Capture **all and only** *proper nouns*;
2. Capture **groups** of nouns which—together—form proper names;
3. Group these nouns into an array, **sorted by word-usage-frequency**.

Since wordpos wasn't able to extract and return exactly what we needed from the text of a website, we wondered if some regular expression could offer us a better and more efficient solution instead. Voila!

# Regex to Parse Proper Nouns

```regex
    / \s+([ie]*-?[A-Z]+.*?)(?:\s+[a-z\W]|[`'’"^,;:—\\\*\.\(\)\[\]]) /
```

As is often the case, regular expressions don't lend themselves to immediate readability or comprehension. So, let's examine this regex in more detail and explore exactly how and why it's able to extract proper nouns. To begin, here is a more illuminating representation of the above regex:

![Visual Representation of Proper-Noun-Parsing Regex](//cardoni.net/media/noun_parsing_regex_visualized.png "Visual Representation of Proper-Noun-Parsing Regex")

As you can see, there is one capture group—denoted by *Group 1*. This capture group represents the text that we are actually interested in: a noun ("Microsoft") or nouns ("iPad Air 2") which—together—form a proper name/noun. The stuff to the left and right of Group 1 ensure that we're capturing groupings of proper-nouns.

### Here is what this regular expression does in plain English:

1. Find one or more whitespace characters (spaces, tabs, and line breaks)
2. Capture one or more words which:
 - *Optionally* begin with the letters "i" or "e"
 - *Optionally* have a dash *after* one of those letters
 - *Must* begin with one or more capital letters
 - Optionally contains additional characters (except line breaks)
3. Finally, this capture group *must* be followed by one of the two below:
 - one or more whitespace characters **and** either a lowercase letter between a–z **or** any character that is not a word character
 - any one of the following characters: `` ' ’ " ^ , ; : — \ * . ( ) [ ]`

# Conclusion
Armed with this regex, we had everything we needed to parse proper nouns from any given website. Here's how it all works from soup-to-nuts: First we actually [request the URL](//www.npmjs.com/package/request) and [extract the text](//www.npmjs.com/package/unfluff) from the response body. Then, we split this large chunk of text on each new sentence and end up with an array of sentences.

We then iterate through this array—running the regex against each individual sentence—and end up creating another new array containing all and only the proper nouns that we're after. From there, we remove duplicates and re-sort the array in order of noun-frequency, as I mentioned above.

And what do we have left? Why, An array of proper nouns, sorted by frequency. It's beautiful!

# Sound Interesting?
Are you an experienced software engineer and find things like this interesting? Check out [Hone's Career](//gohone.com/jobs) page and shoot us an email!