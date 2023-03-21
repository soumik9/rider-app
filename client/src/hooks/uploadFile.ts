// UPLOAD IMAGE FUNCTION
async function uploadFiles(images: Array<File>) {
    const filesArray = []

    for (const item of images) {
        const form = new FormData()
        form.append('file', item)

        form.append('upload_preset', 'ml_digitalgregg');
        form.append('cloud_name', 'digitalgregg');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/digitalgregg/upload',
          { method: 'post', body: form }
        );
        const data = await res.json()

        filesArray.push({ public_id: data.public_id, url: data.secure_url, name: item.name, size: item.size })
    }

    return filesArray
}

export { uploadFiles }