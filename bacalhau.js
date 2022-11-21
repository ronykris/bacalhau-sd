var shell = require("shelljs");
shell.exec("curl -sL https://get.bacalhau.org/install.sh | bash")
var a = shell.exec("echo $?").code
if (a === 0) {
    console.log("installed")
    var b = shell.exec("time bacalhau docker run --gpu 1 ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1 -- python main.py --o ./outputs --p \"two male kickboxers striking at each other\" --n 20").stdout
        //console.log(b)

    const regex = /(?<=Job successfully submitted. Job ID: )(.*)/gm
    var m

    while ((m = regex.exec(b)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        console.log(`${m[0]}`);
        var c = shell.exec(`bacalhau describe ${m[0]}`).stdout
        const regex1 = /(?<=CID: )(.*)/gm
        var n
        while ((n = regex1.exec(c)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex1.lastIndex) {
                regex1.lastIndex++;
            }
            console.log(`${n[0]}`);
        }
    }
}