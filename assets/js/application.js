/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trunc(n){
   return n - n % 1;
}

function getMax (data) 
{
	var max = 0;
	data.forEach(function(row) {
	    row.forEach(function(col) {
	    	if (parseInt(col) > max)
	    	{
	    		max = col;
	    	}
	    	//console.log(col+' | '+max);
		});
	});
	return max;
}

function getMatriks(name, row, col)
{
	var random = $('#bit-depth-random').is(':checked');
	var maxRand = Math.pow(2,$('#bit-depth-random-val').val());
	var i = 0;
	var html = '';
	var valRand;
	while (i <= row)
	{
		var j = 0;

		html += '<tr>';
		while (j <= col)
		{
			if ((i == 0) && (j == 0))
			{
				html += '<td>#</td>';
			}
			else if ((i != 0) && (j == 0))
			{
				html += '<td>'+i+'</td>';
			}
			else if ((i == 0) && (j != 0))
			{
				html += '<td>'+j+'</td>';
			}
			else
			{
				valRand = ((random == true) ? getRandomInt(0,maxRand) : '');
				valRand = ((name == 'kernel') ? 0 : valRand);
				html += '<td><input title="('+i+','+j+')" type="text" name="'+name+'['+i+']['+j+']" class="form-control" placeholder="'+i+','+j+'" value="'+valRand+'"></td>';
			}
			j += 1;
		}
		i += 1;
		html += '</tr>';
	}

	return html;
}

function getKernel (type) 
{
	var kernelType = {
		laplacian : {
			row : 3,
			col : 3,
			val : [
				[0,-1,0],
				[-1,4,-1],
				[0,-1,0]
			]
		},
		gaussian : {
			row : 5,
			col : 5,
			val : [
				[1,4,7,4,1],
				[4,16,26,16,4],
				[7,26,41,26,7],
				[4,16,26,16,4],
				[1,4,7,4,1]
			]
		}
	};

	var name = 'kernel';

	var i = 0;
	var html = '';
	while (i <= kernelType[type].row)
	{
		var j = 0;

		html += '<tr>';
		while (j <= kernelType[type].col)
		{
			if ((i == 0) && (j == 0))
			{
				html += '<td>#</td>';
			}
			else if ((i != 0) && (j == 0))
			{
				html += '<td>'+i+'</td>';
			}
			else if ((i == 0) && (j != 0))
			{
				html += '<td>'+j+'</td>';
			}
			else
			{
				
				html += '<td><input title="('+i+','+j+')" type="text" name="'+name+'['+i+']['+j+']" class="form-control" placeholder="'+i+','+j+'" value="'+kernelType[type].val[i-1][j-1]+'"></td>';
			}
			j += 1;
		}
		i += 1;
		html += '</tr>';
	}

	return html;
}

function getKonvolusi(data, row, col, border)
{
	var i=0;
	var html = '';

	while (i <= row)
	{
		var j = 0;

		html += '<tr>';
		while (j <= col)
		{
			if ((i == 0) && (j == 0))
			{
				html += '<td>#</td>';
			}
			else if ((i != 0) && (j == 0))
			{
				html += '<td>'+i+'</td>';
			}
			else if ((i == 0) && (j != 0))
			{
				html += '<td>'+j+'</td>';
			}
			else
			{
				var style = '';

				if (((i >= border.row.start) && (i <= border.row.end)) &&  ((j >= border.col.start) && (j <= border.col.end)))
				{
					style = 'class="range"';
				}
				
				html += '<td '+style+' title="('+i+','+j+')">'+data[i][j]+'</td>';
			}
			j += 1;
		}
		i += 1;
		html += '</tr>';
	}

	return html;
}

$(document).ready(function(){

	var citra_row = 0;
		citra_col = 0;
		kernel_row = 0;
		kernel_col = 0;

	$('#input-dimensi').submit(function() {
		citra_row = $('#dim-citra-baris').val();
		citra_col = $('#dim-citra-kolom').val();
		kernel_row = $('#dim-kernel-baris').val();
		kernel_col = $('#dim-kernel-kolom').val();

		$('#mtr-citra table').html('');
		$('#mtr-citra table').html(getMatriks('citra', citra_row, citra_col));

		var kernel_type = $('#kernel-type').val();

		if (kernel_type != '') 
		{
			$('#mtr-kernel table').html('');
			$('#mtr-kernel table').html(getKernel(kernel_type));
		}
		else
		{
			$('#mtr-kernel table').html('');
			$('#mtr-kernel table').html(getMatriks('kernel', kernel_row, kernel_col));
		}

		
		console.clear();

		$('#nav-tab-citra').tab('show');
		$('#mtr-output').html('');
		$('#tab-debug ul').html('');

		return false;
	});

	$('#action-default').bind('click', function(e) {
		e.preventDefault();
		$('#dim-citra-baris').val(10);
		$('#dim-citra-kolom').val(10);
		$('#dim-kernel-baris').val(3);
		$('#dim-kernel-kolom').val(3);
		$('#bit-depth-random').attr('checked', true);
		$('#kernel-type').val('laplacian');
		$('#dim-kernel-baris').attr('disabled', true);
		$('#dim-kernel-kolom').attr('disabled', true);
		$('#bit-depth-random').attr('checked', true);
		$('#bit-depth-random-val').val(3);
		$('#bit-depth-random-val').attr('disabled', false);
	});

	$('#action-reset').bind('click', function(e) {
		e.preventDefault();
		$('#dim-citra-baris').val('');
		$('#dim-citra-kolom').val('');
		$('#dim-kernel-baris').val('');
		$('#dim-kernel-kolom').val('');

		$('#bit-depth-random').attr('checked', false);
		$('#bit-depth-random-val').val('');
		$('#bit-depth-random-val').attr('disabled', true);
		$('#kernel-type').val('');

		$('#mtr-citra table').html('');
		$('#mtr-kernel table').html('');
		$('#mtr-output').html('');
		$('#tab-debug ul').html('');
	});

	$('#action-help').bind('click', function(e) {
		e.preventDefault();
		$('body').chardinJs('start');
	});

	$('#kernel-type').change(function(){

		var kernelType = {
			laplacian : {
				row : 3,
				col : 3
			},
			gaussian : {
				row : 5,
				col : 5
			}
		};

		var type = $('#kernel-type').val();

		if ($('#kernel-type').val() == '')
		{
			$('#dim-kernel-baris').attr('disabled', false);
			$('#dim-kernel-kolom').attr('disabled', false);
			$('#dim-kernel-baris').val('');
			$('#dim-kernel-kolom').val('');
		}
		else
		{
			$('#dim-kernel-baris').attr('disabled', true);
			$('#dim-kernel-kolom').attr('disabled', true);
			$('#dim-kernel-baris').val(kernelType[type].row);
			$('#dim-kernel-kolom').val(kernelType[type].row);
		}

	});

	$('#bit-depth-random').change(function(){

		$('#bit-depth-random-val').attr('disabled', !$(this).is(':checked'));

	});

	$('#action-eksekusi').bind('click', function(e) {
		e.preventDefault();
		var data = $('#mtr-citra').serializeObject();
			citra = data.citra;

		var data = $('#mtr-kernel').serializeObject();
			kernel = data.kernel;

		var row_gap = Math.floor($('#dim-kernel-baris').val()/2);
			row_start = 1 + row_gap;
			row_end = $('#dim-citra-baris').val() - row_gap;
			col_gap = Math.floor($('#dim-kernel-kolom').val()/2);
			col_start = 1 + col_gap;
			col_end = $('#dim-citra-kolom').val() - col_gap;
			konvolusi = [];
			maxNum = getMax(citra);

		$('#tab-debug ul').html('');

		var i = row_start; // index baris citra
		while (i <= row_end)
		{
			konvolusi[i] = [];
			var j = col_start; // index kolom citra
			while (j <= col_end)
			{
				var	process_row_start = i - row_gap;
					process_row_end = i + row_gap;
					process_col_start = j - col_gap;
					process_col_end = j + col_gap;
					html = '<li>f('+i+','+j+') = ';
					hasil = 0;

				var m = process_row_start; // index baris pixel tetangga
				var o = 1; // index baris kernel
				while (m <= process_row_end) 
				{
					var n = process_col_start; // index kolom pixel tetangga
					var p = 1; // index kolom kernel
					while (n <= process_col_end)
					{
						hasil += citra[m][n]*kernel[o][p];
						
						html += '('+citra[m][n]+'*'+kernel[o][p]+')';
						if ((m == process_row_end) && (n == process_col_end))
						{
							
							html += ' = '+hasil;
							konvolusi[i][j] = hasil;

							if (hasil > maxNum)
							{
								html += ', <span class="label label-danger">return to '+maxNum+'</span>';
								konvolusi[i][j] = maxNum;
							}

							if (hasil < 0)
							{
								html += ', <span class="label label-warning">return to 0</span>';
								konvolusi[i][j] = 0;
							}
						}
						else
						{
							html += ' + ';
						}

						n += 1;
						p += 1;
					}

					m += 1;
					o += 1;
				}

				$('#tab-debug > ul').append(html+'</li>');

				j += 1;
			}
			i += 1;
		}

		var i = row_start; // index baris citra
		while (i <= row_end)
		{
			var j = col_start; // index kolom citra
			while (j <= col_end)
			{
				citra[i][j] = konvolusi[i][j];
				j += 1;
			}
			i += 1;
		}

		var border = {
			row : {
				start : row_start,
				end : row_end
			},
			col : {
				start : col_start,
				end : col_end
			}
		}

		$('#mtr-output').html('');
		$('#mtr-output').html(getKonvolusi(citra, citra_row, citra_col, border));

		$('#nav-tab-output').tab('show');

	});
	
});