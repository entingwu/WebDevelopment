/**
 * Created by entingwu on 2/21/16.
 */
(function(){
    for(var i = 0; i< 20; i++) {
        var btn = document.createElement("BUTTON");
        btn.innerHTML = i + 1 ;
        btn.onclick = function(){ alert(this.innerHTML)};
        document.body.appendChild(btn);
    }
})();