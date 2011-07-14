truncate = (x) ->
    if x > 0 then Math.floor(x) else Math.ceil(x)

formatSeconds = (seconds) ->
    sign = if seconds >= 0 then "" else "-"
    min = Math.abs(truncate(seconds / 60))
    sec = ("0" + Math.abs(seconds % 60)).slice(-2)
    return "#{sign}#{min}:#{sec}"

class @Timer
    constructor: (seconds = 300, callbacks = {}) ->
        initial = seconds
        paused = true
        activeInterval = null

        tick = ->
            if not paused
                seconds -= 1
                callbacks.tick?(seconds, formatSeconds(seconds))
                callbacks[seconds]?()

        @getSeconds = ->
            return seconds

        @getHumanTime = ->
            return formatSeconds(seconds)

        @start = ->
            paused = false
            activeInterval ?= setInterval(tick, 1000)
            return this
        start = @start

        @stop = ->
            paused = true
            if activeInterval?
                clearInterval activeInterval
                activeInterval = null
            return this
        stop = @stop

        @pause = ->
            if paused then start() else stop()
            return this
        
        @reset = ->
            @stop()
            seconds = initial
            callbacks.reset?()
            return this
