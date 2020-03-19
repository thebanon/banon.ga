fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "f11fde06ebmsh64591de104c43b8p15a944jsn07785be825e2"
    }
})
.then(response => response.json().then(data => {
    console.log(data);
}))
.catch(err => {
    console.log(err);
});
