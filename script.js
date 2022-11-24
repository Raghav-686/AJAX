var data;
function loadData()
{
    const xhr = new XMLHttpRequest();
    xhr.onprogress = function()
    {
        loader();
    }
    xhr.onload = function()
    {
        document.getElementById('loader-wrapper').hidden = true;
        data=JSON.parse(this.responseText).entries;
        button(data);
        showData('All');
    }
    xhr.open("GET" , 'https://api.publicapis.org/entries' , true);
    xhr.send();
}

function button(data)
{
    let str=`<button class="button" onclick="showData('All')">${'All'}</button>`;
    var obj={};
    for(let i of data)
    {
        if(obj[i.Category])
        {
            continue;
        }
        else
        {
        obj[i.Category]=1;
        str = `${str}
        <button class="button" onclick="showData('${i.Category}')">${i.Category}</button>
        `;
        }
    }
    document.getElementById('buttons').innerHTML=str;
}

function showData(id)
{
    let theadStr=``;
    let tbodyStr=``;
        theadStr = `${theadStr}
        <tr>
            <th>API</th>
            <th>Description</th>
            <th>Auth</th>
            <th>HTTPS</th>
            <th>Cors</th>
            <th>Link</th>
            <th>Category</th>
        </tr>`;    
     for(let i of data)
     {
        if(id=="All" || i.Category==id)
        {
            tbodyStr = `${tbodyStr}
            <tr>
                <td>${i.API}</td>
                <td>${i.Description}</td>
                <td>${i.Auth}</td>
                <td>${i.HTTPS}</td>
                <td>${i.Cors}</td>
                <td><a href="${i.Link}" target = '_blank'>${i.Link}</td>
                <td>${i.Category}</td>
            </tr>`;
        }
     } 
     document.getElementById('theadData').innerHTML = theadStr;
     document.getElementById('tbodyData').innerHTML = tbodyStr;
}

function loader()
{
    document.getElementById('loader-wrapper').hidden = false;
}

