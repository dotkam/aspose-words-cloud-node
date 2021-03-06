/*
* MIT License

* Copyright (c) 2019 Aspose Pty Ltd

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

import { expect } from "chai";
import { Given, Then } from "cucumber";
import * as BaseTest from "../../../test/baseTest";
import { DeleteFileRequest, DownloadFileRequest } from "../../../src/api";

Given(/^I have uploaded document with name (.*) and subfolder is (.*) to storage$/, function (documentName, folder, callback) {

    const wordsApi = BaseTest.initializeWordsApi();

    const remotePath = BaseTest.remoteBaseFolder + folder;
    const localPath = BaseTest.localBaseTestDataFolder + folder + documentName;

    wordsApi.uploadFileToStorage(remotePath + documentName, localPath)
        .then((result) => {
            expect(result.response.statusMessage).to.equal("OK");
            callback();
        });
});

Given(/^There is no file (.*) on storage in (.*) folder$/, function (documentName, folder, callback) {

    const wordsApi = BaseTest.initializeWordsApi();

    let remotePath = BaseTest.remoteBaseFolder + folder + documentName;
    if (folder === "output") {
        remotePath = BaseTest.remoteBaseTestOutFolder + documentName;
    }

    const request: DeleteFileRequest = {
        path: remotePath,
        storageName: undefined,
        versionId: undefined
    };

    wordsApi.deleteFile(request)
    .then((result) => {
        expect(result.statusMessage).to.equal("OK");
        callback();
    });
});

Then(/^document (.*) is existed on storage in (.*) folder$/, function (documentName, folder, callback) {

    const wordsApi = BaseTest.initializeWordsApi();

    let remotePath = BaseTest.remoteBaseFolder + folder + documentName;

    if (folder === "output") {
        remotePath = BaseTest.remoteBaseTestOutFolder + documentName;
    }

    const request : DownloadFileRequest = {
        path: remotePath,
        storageName: undefined,
        versionId: undefined
    };

    wordsApi.downloadFile(request).
    then((result) => {
        expect(result.response.statusMessage).to.equal("OK");
        callback();
    });
});
