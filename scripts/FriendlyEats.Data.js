/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

FriendlyEats.prototype.addConfession = function (text) {
  const collection = firebase.firestore().collection('confessions');
  return collection.add({
    anonymous: true,
    text
  });
};

FriendlyEats.prototype.getAllConfessions = function (render) {
  const query = firebase.firestore()
    .collection('confessions')
    .limit(50);
  this.getDocumentsInQuery(query, render);
};

FriendlyEats.prototype.getDocumentsInQuery = function (query, render) {
  query.onSnapshot((snapshot) => {
    if (!snapshot.size) {
      return render();
    }

    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' || change.type === 'modified') {
        render(change.doc);
      }
    });
  });
};

FriendlyEats.prototype.getConfession = function (id) {
  return firebase.firestore().collection('confessions').doc(id).get();
};
