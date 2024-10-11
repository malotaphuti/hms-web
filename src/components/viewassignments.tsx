import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';

export default function viewassignments() {
    const { assignmentData, a_notfound, a_found, a_loading, a_error } =
        useAssignments();

    // list/assign/
    if (assignmentData) {
        return (
            <div className="flex flex-row">
                <h1>{assignmentData.title}</h1>
                <p>{assignmentData.description}</p>
            </div>
        );
    }
}
