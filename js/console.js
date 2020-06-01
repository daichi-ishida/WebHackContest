var term = document.getElementById("terminal");
var commandLines; // kbd要素の配列
var commandLine; // 今書いているkbd要素
var documentElement;
var vcursor; // 縦方向のカーソル位置
var hcursor; // 横方向のカーソル位置
var charList; //今書いているコマンドの内容(一文字ずつ配列になっている)

var dirList = ['index.html','_2.html','1+1.html','11(2).php','vier.html','fingers.html','spider.html','finalist.html','goal.txt']; // ディレクトリリスト(編集可)
var user = 'finalist';



window.onload = function()
{
	if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
		documentElement = document.body;
	} else {
		documentElement = document.documentElement;
	}
	showManual();
	addCommandLineTxt();
};

document.onkeydown = function (e) 
{
	var isEnterPressed = false; //エンターキーフラグ

	switch (e.keyCode)
	{

		//backspace
		case 8:
			if (hcursor > 0)
			{
				charList.splice(hcursor-1, 1);
				hcursor--;
			}
			break;

		//enter
		case 13:
			isEnterPressed = true;
			break;

		//space
		case 32:
			charList.splice(hcursor, 0, '&nbsp;');
			hcursor++;
			break;

		//left arrow
		case 37:
			if (hcursor > 0)
			{
				hcursor--;
			}
			break;

		//up arrow
		case 38:
			if (vcursor > 0)
			{
				vcursor--;
				charList = commandLines[vcursor].textContent.split('');
				hcursor = charList.length;
			}
			break;

		//right arrow
		case 39:
			if (hcursor < charList.length)
			{
				hcursor++;
			}
			break;

		//down arrow
		case 40:
			if (vcursor < commandLines.length-1)
			{
				vcursor++;
				if (vcursor == commandLines.length-1)
				{
					charList = [];
					hcursor = 0;
				}
				else
				{
					charList = commandLines[vcursor].textContent.split('');
					hcursor = charList.length;
				}
				
			}
			break;

		//delete
		case 46:
			charList.splice(hcursor, 1);
			break;

		default:
			if ( (e.shiftKey && (e.keyCode == 188 || e.keyCode == 190)) == false)
			{
				var isProhibit = false;
				//禁止キーコード
				var prohibitedChars = 
				[
				9,16,17,18,19,20,27,28,29,33,34,35,36,45,91,92,
				112,113,114,115,116,117,118,119,120,121,122,123, // function key
				144,145,240,242,243,244
				];

				//禁止キーコードか判定
				isProhibit = prohibitedChars.some(function(value) {return (e.keyCode == value)});
				if (isProhibit == false)
				{
					charList.splice(hcursor, 0, e.key);
					hcursor++;
				}
			}
			break;
	}

	joinChar();
	if (isEnterPressed)
	{
		ExecuteCommand();
		addCommandLineTxt();
	}

};

function ExecuteCommand()
{
	commandLine.innerHTML = charList.join('');
	var command = commandLine.innerHTML.split('&nbsp;');
	switch (command[0]){

		case 'ls':
			showDirList();
			break;

		case 'rm':
			if (command.length >= 2)
			{
				var rm_index = dirList.indexOf(command[1]);
				if (rm_index >= 0)
				{
					if(command[1] == '_2.html')
					{
						user = 'root';
						term.innerHTML += '<p>Authentication Successful</p>';
					}
					dirList.splice(rm_index,1);
				}
				else
				{
					term.innerHTML += '<p>rm: cannot remove \'' + command[1] + '\': No such file</p>';
				}
			}
			else
			{
				term.innerHTML += '<p>rm: missing operand</p><p>Try \'man\' for more information.</p>';
			}
			term.innerHTML += '<p>&nbsp;</p>';
			break;

		case 'reset':
			initialize();
			break;

		case 'man':
			showManual();
			break;

		default:
			var file = command[0].substr(2);
			var index = dirList.indexOf(file);
			if (command[0].substr(0,2) =='./' && index >= 0)
			{
				if (file == 'goal.txt' && user == 'finalist')
				{
					term.innerHTML += '<p>-bash: ' + command[0] + ': Permission denied</p><p>&nbsp;</p>';
				}
				else if (file == 'goal.txt' && user == 'root')
				{
					term.innerHTML += '<p><strong>Congratulations!</strong></p><p>Your goal is <a href="winner.html">winner.html</a></p><p>&nbsp;</p>';
				}
				else
				{
					window.open(dirList[index],'_blank');
				}
			}
			else
			{
				term.innerHTML += '<p>-bash: ' + command[0] + ': not found</p><p>&nbsp;</p>';
			}
			break;
	}
}

function addCommandLineTxt()
{
	term.innerHTML += '<p class="command">['+user+'@localhost ~]'+(user=='finalist'? '$':'#')+' <kbd><span>&nbsp;</span></kbd></p>';
	commandLines = document.getElementsByTagName("kbd");
	vcursor = commandLines.length - 1;
	hcursor = 0;
	charList = [];
	commandLine = commandLines[vcursor];
	documentElement.scrollTop = term.clientHeight;
}

function joinChar()
{
	var processedCharList; //カーソル位置に<span>を挟み込んだもの

	processedCharList = charList.concat(); // 配列の(ディープ)コピー

	if (hcursor == charList.length)
	{
		processedCharList.push('&nbsp;');
	}
	processedCharList.splice(hcursor,0,'<span>');
	processedCharList.splice(hcursor+2,0,'</span>')

	commandLine.innerHTML = processedCharList.join('');
}

function initialize()
{
	// ディレクトリリスト
	var init_list = ['index.html','_2.html','1+1.html','11(2).php','vier.html','spider.html','fingers.html','finalist.html','goal.txt'];
	dirList = init_list.concat();
	term.innerHTML = '';
	user = 'finalist';
}

function showDirList()
{
	dirList.forEach(function(filename){
		term.innerHTML += '<p>' + filename + '</p>';
	});
	term.innerHTML += '<p>&nbsp;</p>';
}

function showManual()
{
	term.innerHTML += '<p>Command you can use:</p> <pre>    man   - display this manual</pre> <pre>    ls    - list directory contents</pre> <pre>    rm    - remove files</pre> <pre>    reset - reset to the initial state</pre> <p>&nbsp;</p> <p>When you want to access the file, command</p> <p>&nbsp;&nbsp;&nbsp;&nbsp;./[<I>filename</I>]</p> <p>&nbsp;</p>';
}