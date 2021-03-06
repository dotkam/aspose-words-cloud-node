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
import "mocha";

import { CommentInsert, CommentUpdate, DeleteCommentRequest, DocumentPosition, GetCommentRequest, GetCommentsRequest, InsertCommentRequest, NodeLink, UpdateCommentRequest } from "../../src/model/model";
import * as BaseTest from "../baseTest";

const testFolder = "DocumentElements/Comments";

describe("comments", () => {
    describe("getComment function", () => {

        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestGetComment.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new GetCommentRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.commentIndex = 0;

                    // Act
                    return wordsApi.getComment(request)
                        .then((result1) => {
                            // Assert
                            expect(result1.response.statusCode).to.equal(200);

                            expect(result1.body.comment).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("getComments function", () => {

        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestGetComments.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new GetCommentsRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;

                    // Act
                    return wordsApi.getComments(request)
                        .then((result1) => {
                            // Assert
                            expect(result1.response.statusCode).to.equal(200);

                            expect(result1.body.comments).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("insertComment function", () => {

        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestPutComment.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new InsertCommentRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;

                    const nodeLink = new NodeLink();
                    nodeLink.nodeId = "0.3.0.3";
                    const documentPosition = new DocumentPosition();
                    documentPosition.node = nodeLink;
                    documentPosition.offset = 0;
                    request.comment = new CommentInsert();
                    request.comment.rangeStart = documentPosition;
                    request.comment.rangeEnd = documentPosition;
                    request.comment.initial = "IA";
                    request.comment.author = "Imran Anwar";
                    request.comment.text = "A new Comment";

                    // Act
                    return wordsApi.insertComment(request)
                        .then((result1) => {
                            // Assert
                            expect(result1.response.statusCode).to.equal(200);

                            expect(result1.body.comment).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("updateComment function", () => {

        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestPostComment.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new UpdateCommentRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;

                    request.commentIndex = 0;
                    const nodeLink = new NodeLink();
                    nodeLink.nodeId = "0.3.0";
                    const documentPosition = new DocumentPosition();
                    documentPosition.node = nodeLink;
                    documentPosition.offset = 0;
                    request.comment = new CommentUpdate();
                    request.comment.rangeStart = documentPosition;
                    request.comment.rangeEnd = documentPosition;
                    request.comment.initial = "IA";
                    request.comment.author = "Imran Anwar";
                    request.comment.text = "A new Comment";

                    // Act
                    return wordsApi.updateComment(request)
                        .then((result1) => {
                            // Assert
                            expect(result1.response.statusCode).to.equal(200);

                            expect(result1.body.comment).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("deleteComment function", () => {

        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestDeleteComment.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new DeleteCommentRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.commentIndex = 0;

                    // Act
                    return wordsApi.deleteComment(request)
                        .then((result1) => {
                            // Assert
                            expect(result1.statusCode).to.equal(200);
                        });
                });
        });
    });
});
