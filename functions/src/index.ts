// import * as functions from 'firebase-functions';
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});

exports.generateThumbnail = functions.storage.object().onChange((event) => {
    const object = event.data; // The Storage object.

    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

// Get the file name.
    const fileName = path.basename(filePath);
// Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
        console.log('Already a Thumbnail.');
        return null;
    }

// Exit if this is a move or deletion event.
    if (resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return null;
    }

// Exit if file exists but is not new and is only being triggered
// because of a metadata change.
    if (resourceState === 'exists' && metageneration > 1) {
        console.log('This is a metadata change event.');
        return null;
    }

    // Download file from bucket.
    const bucket = gcs.bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
        contentType: contentType,
    };
    return bucket.file(filePath).download({
        destination: tempFilePath,
    }).then(() => {
        console.log('Image downloaded locally to', tempFilePath);
        // Generate a thumbnail using ImageMagick.
        return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
    }).then(() => {
        console.log('Thumbnail created at', tempFilePath);
        // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
        const thumbFileName = `thumb_${fileName}`;
        const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
        // Uploading the thumbnail.
        return bucket.upload(tempFilePath, {
            destination: thumbFilePath,
            metadata: metadata,
        });
        // Once the thumbnail has been uploaded delete the local file to free up disk space.
    }).then(() => fs.unlinkSync(tempFilePath));
});

/*
exports.generateThumbnail = functions.storage.object().onChange(event => {

    const object = event.data; // The Storage object.

    console.log(object)

    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

    const SIZES = [64, 256, 512]; // Resize target width in pixels

    if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
        console.log('This is not an image.');
        return;
    }

    if (_.includes(filePath, '_thumb')) {
        console.log('already processed image');
        return;
    }


    const fileName = filePath.split('/').pop();
    const bucket = gcs.bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);

    return bucket.file(filePath).download({
        destination: tempFilePath
    }).then(() => {

        _.each(SIZES, (size) => {

            const newFileName = `${fileName}_${size}_thumb.png`
            const newFileTemp = path.join(os.tmpdir(), newFileName);
            const newFilePath = `thumbs/${newFileName}`

            sharp(tempFilePath)
                .resize(size, null)
                .toFile(newFileTemp, (err, info) => {

                    bucket.upload(newFileTemp, {
                        destination: newFilePath
                    });

                });

        })
    })
})
*/
