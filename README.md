This is a website which I made in order to help me revise. I started it almost a year ago, but after leaving it for a couple months, I have recently come back to it to make some changes to the looks and the way it works 

It has a couple of chemistry-related notes-style pages, with quizzes at the end. You can log in in order to save your scores. When you do the quiz, it produces a weighting so that the questions you get wrong more come up more.

It used to use a json file on my computer to store the user's data, but I moved it over to using mongoDB Atlas a few weeks ago, which has made it much easier to save and find user data. This was one of the main improvements I made to it.

I recently added a revision timetable maker which allows you to add, remove or edit sessions which can have a subject, type, start time and endtime. The timetable is displayed on a weekly calendar, which can be used to navigate to different weeks. Each session has a colour depending on it's type and can be deleted or edited directly from the calendar. The sessions are all stored on mongoDB if you are logged in.
I just added a list of your revision sessions to this page, which allows you to view them in a list and edit, delete or mark them as done easily.

In the future I plan to add more to the revision quiz and notes side of the website, as it currently only has two topics. This could involve creating standard/template pages, which can easily be changed and used to make new pages for topics. This would streamline the process a lot, especially if I could do something like this for making quizzes.

The project is currently accessible on render at revit-3yqg.onrender.com, although it can take a while to load.

Also, the way the data is stored e.g. passwords is absolutely not secure, as they are all stored in plain text and transferred by HTTP. Once again, perhaps, this is something I could improve on in the future.
