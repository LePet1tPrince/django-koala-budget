# To do list
1. Figure out how to get this posting transaction error about not having an account instance.
2. Set up all post requests.
3. Split out API request files into folders for each type of request
4. Once you get multiple transactions posting working, look for csv upload library and get that bulk upload working.


## Long term list
- Add in delete functionality
- Add in update functionality (this will be a lot of work. Make sure you have a clean system for doing this)
- Add in goals model. On the goals page (budget page?), have a number that is (SUM(all asset accounts) - SUM(all goal accounts)) to show how much we have left to put towards our goals.
- Add in a 'IsReviewed' field to transactions so that we can have a 'for review' and a 'categorized' section of the bank feed.


## Things to think about
Make sure to have some way of seeing transactions that are between 2 balance sheet accounts. Or maybe I should validate it so you can't. 
Can I make 1 table component for accounts and transactions? That would be really nice
How do I want to do reports? I could do a profit and loss and balance sheet sort of thing.
