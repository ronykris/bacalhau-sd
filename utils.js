import shell from "shelljs"


//Regex match expressions
const fetchJobId = /(?<=Job successfully submitted. Job ID: )(.*)/gm
const fetchCID = /(?<=CID: )(.*)/gm

//Regex to match pattern and extract
function extract(pattern, text) {
    const regex = pattern
    var m
    while ((m = regex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        console.log(`${m[0]}`);
        return m[0]
    }
}

//Download & install bacalhau client
function downloadClient() {
    const downloadClientCMD = "curl -sL https://get.bacalhau.org/install.sh | bash"

    shell.exec(downloadClientCMD)
    return shell.exec("echo $?").code
}

export const checkVersion = () => {
    const cmd = 'bacalhau version'
    const versions = shell.exec(cmd).stdout.trim().split('\n')
    var download = 0;

    if (versions[0].split(':')[1].trim() === versions[1].split(':')[1].trim()) { download = 0 } else { download = 1 }

    console.log('download:', download)
    return download
}

const submitJob = (prompt) => {
    try {
        const submitSDJob = `bacalhau docker run --gpu 1 ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1 -- python main.py --o ./outputs --p "${prompt}" --n 35`

        const data = []
        var obj = new Object()

        const jobId = extract(fetchJobId, shell.exec(submitSDJob).stdout)
        const cid = extract(fetchCID, shell.exec(`bacalhau describe ${jobId}`).stdout)
        console.log(`CID : ${cid}`)
        const url = `https://ipfs.io/ipfs/${cid}/outputs/image0.png`

        obj.jobID = jobId
        obj.CID = cid
        obj.url = url
        data.push(obj)
        console.log(data)
        return data;
    } catch (e) {
        console.error(e)
    }

}

//invoke bacalhau SD command
export async function bacalhauSD(prompt) {
    try {

        if (prompt !== undefined) {
            console.log(`prompt : ${prompt}`)
            if (checkVersion() === 1) {
                downloadClient()
                return submitJob(prompt)
            } else {
                return submitJob(prompt)
            }
        } else {
            return 'prompt undefined'
        }
    } catch (e) {
        console.error(e)
        return e
    }
}