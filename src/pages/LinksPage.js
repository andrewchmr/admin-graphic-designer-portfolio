import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/works');
      setLinks(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links} fetch={fetchLinks} />}
    </>
  )
};
