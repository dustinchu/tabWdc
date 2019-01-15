(function () {

    var myConnector = tableau.makeConnector();

    // This creates the Web Data Connector schema that
    // describes the information returned by hte WDC.
    myConnector.getSchema = function (schemaCallback) {
        var cols = [ {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "title_with_ruby",
            alias: "title_with_ruby",
            dataType: tableau.dataTypeEnum.string
        },];
    
        var tableSchema = {
            id: "1",
            alias: "2 with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    // This function is called when data is required from the
    // Web Data Connector.
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://www3.nhk.or.jp/news/easy/top-list.json?_=1546911646431", function(data) {
            var  tableData = [];
                
            // Iterate over the JSON object
            for (var i = 0 ,len = data.length; i < len; i++) {
                tableData.push({
              
                    "title": data[i].title,
                    "title_with_ruby": data[i].title_with_ruby,
                
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    // This is reqired to register the Web Data Connector.
    tableau.registerConnector(myConnector);

    // Once the document has loaded we will attached functionality
    // to the submitButton.
    $(document).ready(function () {
        $("#submitButton").click(function () {
            //該tableau.connectionName變量定義了在Tableau中顯示時我們想要調用連接器數據源的內容。
            tableau.connectionName = "Web Data Connector Part 1";
            //該tableau.submit()函數將連接器對象發送到Tableau以進行驗證。
            tableau.submit();
        });
    });
})();