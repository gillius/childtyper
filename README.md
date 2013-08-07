childtyper
==========

Coming soon, a Web-based typing game for young children to teach association, cause and effect, and (eventually) reading.

You can see the current prototype at http://gillius.org/childtyper/ (this link might change).

This is based on a program my parents wrote for me when I was very young in the early 1980s that ran on a Tandy TRS-80 model 3/4.

License
-------

This project is licensed under the GNU Affero General Public license, version 3 or later, with the
following exceptions:

The images are pulled from Wikipedia. All of the images so far are available under (at least)
Creative Commons Attribution or ShareAlike licenses. Each image is provided under the original
license. The file images/credits.json contains specific information.

Running
-------

For now what I have is http-server and bower with node.js. After installing node.js (which comes
with npm):

```
npm -g install bower
npm -g install http-server
bower install
http-server -a 127.0.0.1
#On Windows
start http://localhost:8080/
```