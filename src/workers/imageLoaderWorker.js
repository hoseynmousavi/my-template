import workerBuilder from "./workerBuilder"

const imageLoaderWorker = `() =>
{
    self.onmessage = async event =>
    {
        const imageURL = event.data
        const response = await fetch(imageURL)
        const blob = await response.blob()
        postMessage({imageURL, blob})
    }
}`

export default workerBuilder(imageLoaderWorker)