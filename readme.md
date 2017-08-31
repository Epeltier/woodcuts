WoodCuts


This tool was created out of interest in maximizing the efficiency of board cuts while building a credenza and from curiosity in researching the problem and studying the Cutting Stock Problem (https://en.wikipedia.org/wiki/Cutting_stock_problem).

The premise is that given a number of different lengths of wood that are to be cut from lumber stock, determine the most efficient cutting pattern to reduce the waste of the stock. This is the same as minimizing the number of stock boards to complete all of the necessary cuts. 

In computational complexity, this is an NP-hard problem. The solution here implements the first-fit decreasing algorithm, which provides a solution of use worst-case (4M + 1)/3 boards, where M is the number of boards used in the optimal solution. 

This application uses front-end javascript with angularjs and jquery libraries. 

